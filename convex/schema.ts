// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema(
	{
		users: defineTable({
			name: v.string(),
			externalId: v.string(),
			organizations: v.optional(v.array(v.string())),
		}).index('byExternalId', ['externalId']),
		organizations: defineTable({
			name: v.string(),
			externalId: v.optional(v.string()),
			imageUrl: v.optional(v.string()),
			slug: v.optional(v.string()),
		}).index('byExternalId', ['externalId']),
		organizationInvitations: defineTable({
			createdAt: v.number(),
			email: v.string(),
			externalId: v.string(),
			orgId: v.id('organizations'),
			externalOrgId: v.string(),
			role: v.string(),
			status: v.union(v.literal('pending'), v.literal('accepted'), v.literal('revoked')),
			updatedAt: v.number(),
		})
			.index('byExternalId', ['externalId'])
			.index('byOrgId', ['orgId'])
			.index('byEmail', ['email']),
		organizationMemberships: defineTable({
			externalId: v.string(),
			createdAt: v.number(),
			updatedAt: v.number(),
			orgId: v.id('organizations'),
			externalOrgId: v.string(),
			userId: v.id('users'),
			externalUserId: v.string(),
			imageUrl: v.optional(v.string()),
			name: v.string(),
			slug: v.string(),
			role: v.string(),
		})
			.index('byExternalId', ['externalId'])
			.index('byOrgId', ['orgId'])
			.index('byUserId', ['userId']),
		mentorSignUpForms: defineTable({
			organizationId: v.id('organizations'),
			firstName: v.string(),
			lastName: v.string(),
			email: v.string(),
			message: v.string(),
			referenceEmail: v.string(),
			referenceResponse: v.optional(v.string()),
			isComplete: v.optional(v.boolean()),
		})
			.index('byOrganizationId', ['organizationId'])
			.index('byEmail', ['email'])
			.index('byReferenceEmail', ['referenceEmail']),
	},

	// If you ever get an error about schema mismatch
	// between your data and your schema, and you cannot
	// change the schema to match the current data in your database,
	// you can:
	//  1. Use the dashboard to delete tables or individual documents
	//     that are causing the error.
	//  2. Change this option to `false` and make changes to the data
	//     freely, ignoring the schema. Don't forget to change back to `true`!
	{ schemaValidation: true }
)
