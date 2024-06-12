import { zid } from 'convex-helpers/server/zod'
import { z } from 'zod'

export const upsertAssessmentSchema = {
	title: z.string(),
	description: z.optional(z.string()),
	passingScore: z.optional(z.coerce.number()),
	assessmentId: z.optional(zid('assessments')),
}
