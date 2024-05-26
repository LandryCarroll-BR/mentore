import { z } from 'zod'

export const organizationSchema = z.object({
	firstName: z.string().min(3).max(50),
	lastName: z.string().min(3).max(50),
	email: z.string().email(),
	message: z.string().min(3).max(500),
	referenceEmail: z.string().email(),
	organizationId: z.string(),
})

export type OrganizationSchema = z.infer<typeof organizationSchema>

export const switchOrganizqationSchema = z.object({
	externalOrganizationId: z.string(),
})

export const updateMentorSignUpFormSchema = z.object({
	signUpFormId: z.string(),
	referenceResponse: z.string(),
})
