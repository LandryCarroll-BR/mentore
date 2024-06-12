import { ActionCtx, internalMutation, MutationCtx, query, QueryCtx } from './_generated/server'
import { OrganizationJSON } from '@clerk/backend'
import { v, Validator } from 'convex/values'
import { Doc, Id } from './_generated/dataModel'
import { createClerkClient } from '@clerk/backend'

export const clerk = createClerkClient({
	secretKey: 'sk_test_Y0FomNbUiTfoxoOyxt58p1vvhwDZajlZIqj9VHSCth',
	publishableKey: 'whsec_aAmj29CQObb+FY5E9aMroEmRZQN3uC62',
})

export const current = query({
	handler: async (ctx) => {
		return await getCurrentOrg(ctx)
	},
})

export const upsertFromClerk = internalMutation({
	args: { data: v.any() as Validator<OrganizationJSON> }, // no runtime validation, trust Clerk
	async handler(ctx, { data }) {
		const orgAttributes = {
			name: data.name,
			externalId: data.id,
			imageUrl: data.image_url,
			slug: data.slug,
		} satisfies Omit<Doc<'organizations'>, '_id' | '_creationTime'>

		const org = await orgByExternalId(ctx, data.id)
		if (org === null) {
			await ctx.db.insert('organizations', orgAttributes)
		} else {
			await ctx.db.patch(org._id, orgAttributes)
		}
	},
})

export const deleteFromClerk = internalMutation({
	args: { clerkOrgId: v.string() },
	async handler(ctx, { clerkOrgId }) {
		const org = await orgByExternalId(ctx, clerkOrgId)

		if (org !== null) {
			await ctx.db.delete(org._id)
		} else {
			console.warn(`Can't delete org, there is none for Clerk org ID: ${clerkOrgId}`)
		}
	},
})

export async function getCurrentOrgOrThrow(ctx: QueryCtx) {
	const orgRecord = await getCurrentOrg(ctx)
	if (!orgRecord) throw new Error("Can't get current org")
	return orgRecord
}

export async function getCurrentOrg(ctx: QueryCtx) {
	const user = await ctx.auth.getUserIdentity()
	if (!user) return
	const orgId = user.gender
	if (!orgId) return
	return await orgByExternalId(ctx, orgId)
}

export async function orgByExternalId(ctx: QueryCtx, externalId: string) {
	return await ctx.db
		.query('organizations')
		.withIndex('byExternalId', (q) => q.eq('externalId', externalId))
		.unique()
}

export async function orgInvitationByExternalId(ctx: QueryCtx, externalId: string) {
	return await ctx.db
		.query('organizationInvitations')
		.withIndex('byExternalId', (q) => q.eq('externalId', externalId))
		.unique()
}

export const getOrganizationByid = query({
	args: { id: v.id('organizations') },
	handler: async (ctx, { id }) => {
		return await ctx.db.get(id)
	},
})

export const getByExternalId = query({
	args: { externalId: v.string() },
	handler: async (ctx, { externalId }) => {
		return await orgByExternalId(ctx, externalId)
	},
})

export const getAllOrganizations = query({
	handler: async (ctx) => {
		return await ctx.db.query('organizations').collect()
	},
})

export async function getOrganizationAdmin(externalId: string) {
	const users = await clerk.organizations.getOrganizationMembershipList({
		organizationId: externalId,
	})
	console.log(users)
}

export async function getOrganizationExternalId(
	ctx: MutationCtx,
	organizationId: Id<'organizations'>
) {
	const org = await ctx.db.get(organizationId)
	return org?.externalId
}
