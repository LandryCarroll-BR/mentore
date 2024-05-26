import { internalMutation, query, QueryCtx } from './_generated/server'
import { OrganizationMembershipJSON } from '@clerk/backend'
import { v, Validator } from 'convex/values'
import { Doc } from './_generated/dataModel'
import { userByExternalId } from './user'
import { orgByExternalId } from './organization'

export async function orgMembershipByExternalId(ctx: QueryCtx, externalId: string) {
	return await ctx.db
		.query('organizationMemberships')
		.withIndex('byExternalId', (q) => q.eq('externalId', externalId))
		.unique()
}

export const upsertFromClerk = internalMutation({
	args: { data: v.any() as Validator<OrganizationMembershipJSON> }, // no runtime validation, trust Clerk
	async handler(ctx, { data }) {
		const membershipAttributes = {
			slug: data.organization.slug,
			createdAt: data.created_at,
			externalUserId: data.public_user_data.user_id,
			imageUrl: data.organization.image_url,
			externalId: data.id,
			name: data.organization.name,
			externalOrgId: data.organization.id,
			role: data.role,
			updatedAt: data.updated_at,
		} satisfies Omit<Doc<'organizationMemberships'>, '_id' | '_creationTime' | 'orgId' | 'userId'>

		const membership = await orgMembershipByExternalId(ctx, data.id)
		const user = await userByExternalId(ctx, data.public_user_data.user_id)
		const org = await orgByExternalId(ctx, data.organization.id)
		if (membership === null) {
			if (!user) {
				console.warn(
					`Can't insert org membership, there is no user for Clerk user ID: ${data.public_user_data.user_id}`
				)
				return
			}
			if (!org) {
				console.warn(
					`Can't insert org membership, there is no org for Clerk org ID: ${data.organization.id}`
				)
				return
			}
			await ctx.db.insert('organizationMemberships', {
				...membershipAttributes,
				userId: user._id,
				orgId: org._id,
			})
		} else {
			await ctx.db.patch(membership._id, membershipAttributes)
		}
	},
})

export const deleteFromClerk = internalMutation({
	args: { clerkMembershipId: v.string() },
	async handler(ctx, { clerkMembershipId }) {
		const orgMembership = await orgMembershipByExternalId(ctx, clerkMembershipId)

		if (orgMembership !== null) {
			await ctx.db.delete(orgMembership._id)
		} else {
			console.warn(`Can't delete org, there is none for Clerk org ID: ${clerkMembershipId}`)
		}
	},
})

export const getOrgMembershipsByUser = query({
	args: { externalUserId: v.string() },
	async handler(ctx, { externalUserId }) {
		const user = await userByExternalId(ctx, externalUserId)
		if (!user) return
		return await ctx.db
			.query('organizationMemberships')
			.withIndex('byUserId', (q) => q.eq('userId', user?._id))
			.collect()
	},
})
