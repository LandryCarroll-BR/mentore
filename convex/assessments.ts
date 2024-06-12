import { zid } from 'convex-helpers/server/zod'
import { mutationWithZod, queryWithZod } from './utils/builders'
import { upsertAssessmentSchema } from './utils/validators'

export const upsert = mutationWithZod({
	args: upsertAssessmentSchema,
	handler: async (ctx, { assessmentId, ...assessment }) => {
		if (assessmentId) {
			const existingAssessment = await ctx.db.get(assessmentId)
			if (existingAssessment) {
				return await ctx.db.patch(assessmentId, {
					...assessment,
					organizationId: ctx.organization._id,
				})
			}
		}
		return await ctx.db.insert('assessments', {
			...assessment,
			organizationId: ctx.organization._id,
		})
	},
})

export const findManyByOrgId = queryWithZod({
	args: {},
	async handler(ctx) {
		return ctx.db
			.query('assessments')
			.withIndex('byOrganizationId', (q) => q.eq('organizationId', ctx.organization._id))
			.collect()
	},
})

export const findUnique = queryWithZod({
	args: { assessmentId: zid('assessments') },
	async handler(ctx, { assessmentId }) {
		const assessment = await ctx.db.get(assessmentId)
		return assessment
	},
})
