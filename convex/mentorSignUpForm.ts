import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

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

export const getByEmail = query({
	args: { email: v.string() },
	handler: async (ctx, { email }) => {
		return await ctx.db
			.query('mentorSignUpForms')
			.withIndex('byEmail', (q) => q.eq('email', email))
			.collect()
	},
})

export const getByReferenceEmail = query({
	args: { referenceEmail: v.string() },
	handler: async (ctx, { referenceEmail }) => {
		return await ctx.db
			.query('mentorSignUpForms')
			.withIndex('byReferenceEmail', (q) => q.eq('referenceEmail', referenceEmail))
			.collect()
	},
})
