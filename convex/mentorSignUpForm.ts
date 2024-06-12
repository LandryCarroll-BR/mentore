import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { orgByExternalId } from './organization'
import { queryWithZod } from './utils/builders'

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

export const getByOrganization = queryWithZod({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query('mentorSignUpForms')
			.withIndex('byOrganizationId', (q) => q.eq('organizationId', ctx.organization._id))
			.collect()
	},
})
