import { internalMutation, query, QueryCtx } from './_generated/server'
import { OrganizationInvitationJSON } from '@clerk/backend'
import { v, Validator } from 'convex/values'
import { Doc } from './_generated/dataModel'
import { orgByExternalId } from './organization'
import { queryWithZod } from './utils/builders'
import { zid } from 'convex-helpers/server/zod'

export async function orgInvitationByExternalId(ctx: QueryCtx, externalId: string) {
	return await ctx.db
		.query('organizationInvitations')
		.withIndex('byExternalId', (q) => q.eq('externalId', externalId))
		.unique()
}

export const upsertFromClerk = internalMutation({
	args: { data: v.any() as Validator<OrganizationInvitationJSON> }, // no runtime validation, trust Clerk
	async handler(ctx, { data }) {
		const invitaionAttributes = {
			createdAt: data.created_at,
			email: data.email_address,
			externalId: data.id,
			externalOrgId: data.organization_id,
			role: data.role,
			status: data.status ?? 'pending',
			updatedAt: data.updated_at,
		} satisfies Omit<Doc<'organizationInvitations'>, '_id' | '_creationTime' | 'orgId'>

		const orgInvitation = await orgInvitationByExternalId(ctx, data.id)
		const org = await orgByExternalId(ctx, data.organization_id)
		if (orgInvitation === null) {
			if (!org) {
				console.warn(
					`Can't insert org invitation, there is no org for Clerk org ID: ${data.organization_id}`
				)
				return
			}
			await ctx.db.insert('organizationInvitations', { ...invitaionAttributes, orgId: org._id })
		} else {
			await ctx.db.patch(orgInvitation._id, invitaionAttributes)
		}
	},
})

export const deleteFromClerk = internalMutation({
	args: { clerkOrgInvitationId: v.string() },
	async handler(ctx, { clerkOrgInvitationId }) {
		const orgInviation = await orgInvitationByExternalId(ctx, clerkOrgInvitationId)

		if (orgInviation !== null) {
			await ctx.db.delete(orgInviation._id)
		} else {
			console.warn(`Can't delete org, there is none for Clerk org ID: ${clerkOrgInvitationId}`)
		}
	},
})

export const getInvitationsByUserEmail = queryWithZod({
	args: {},
	async handler(ctx) {
		const user = await ctx.auth.getUserIdentity()
		const email = user?.email
		if (!email) throw new Error('User has no email')

		return ctx.db
			.query('organizationInvitations')
			.withIndex('byEmail', (q) => q.eq('email', email))
			.collect()
	},
})

export const getInvitationById = queryWithZod({
	args: { id: zid('organizationInvitations') },
	handler(ctx, { id }) {
		return ctx.db.get(id)
	},
})
