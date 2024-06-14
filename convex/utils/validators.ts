import { zid } from 'convex-helpers/server/zod'
import { z } from 'zod'

export const upsertAssessmentSchema = {
	title: z.string(),
	description: z.optional(z.string()),
	passingScore: z.optional(z.coerce.number()),
	assessmentId: z.optional(zid('assessments')),
}

export const organizationSchema = {
	firstName: z.string().min(3).max(50),
	lastName: z.string().min(3).max(50),
	email: z.string().email(),
	message: z.string().min(3).max(500),
	referenceEmail: z.string().email(),
	organizationId: z.string(),
}
