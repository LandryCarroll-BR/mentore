import { internalMutation, query, QueryCtx } from './_generated/server'
import { OrganizationJSON } from '@clerk/backend'
import { v, Validator } from 'convex/values'

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
		}

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
