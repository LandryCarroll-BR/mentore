import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { orgByExternalId } from './organization'

export const insert = mutation({
	args: {
		organizationId: v.id('organizations'),
		firstName: v.string(),
		lastName: v.string(),
		email: v.string(),
		message: v.string(),
		referenceEmail: v.string(),
	},
	handler: async (ctx, { organizationId, firstName, lastName, email, message, referenceEmail }) => {
		return await ctx.db.insert('mentorSignUpForms', {
			organizationId,
			firstName,
			lastName,
			email,
			message,
			referenceEmail,
		})
	},
})

export const patch = mutation({
	args: {
		id: v.id('mentorSignUpForms'),
		referenceResponse: v.string(),
		isComplete: v.optional(v.boolean()),
	},
	handler: async (ctx, { id, ...rest }) => {
		return await ctx.db.patch(id, rest)
	},
})

export const getByOrganization = query({
	args: { externalOrgId: v.string() },
	handler: async (ctx, { externalOrgId }) => {
		const org = await orgByExternalId(ctx, externalOrgId)
		if (!org?._id) return []
		return await ctx.db
			.query('mentorSignUpForms')
			.withIndex('byOrganizationId', (q) => q.eq('organizationId', org._id))
			.collect()
	},
})
