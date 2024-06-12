'use server'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { clerk } from '@/lib/clerk'
import { fetchMutation, fetchQuery } from 'convex/nextjs'

import { action } from '@/lib/safe-action'
import { organizationSchema, updateMentorSignUpFormSchema } from '@/schemas'
import { Role } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export const sendInvitation = action(
	organizationSchema,
	async ({ firstName, lastName, email, message, referenceEmail, organizationId }) => {
		const organization = await fetchQuery(api.organization.getOrganizationByid, {
			id: organizationId as Id<'organizations'>,
		})
		if (!organization?.externalId) return
		const orgUsers = await clerk.organizations.getOrganizationMembershipList({
			organizationId: organization.externalId,
		})
		if (!orgUsers.data) return
		const inviterUser = orgUsers.data.find((user) => user.role === Role.Admin)
		const inviterUserId = inviterUser?.publicUserData?.userId
		if (!inviterUserId) return
		await clerk.organizations.createOrganizationInvitation({
			organizationId: organization?.externalId,
			inviterUserId: inviterUserId,
			emailAddress: email,
			role: Role.Applicant,
		})
		await clerk.organizations.createOrganizationInvitation({
			organizationId: organization?.externalId,
			inviterUserId: inviterUserId,
			emailAddress: referenceEmail,
			role: Role.Reference,
		})
		await fetchMutation(api.mentorSignUpForm.insert, {
			organizationId: organizationId as Id<'organizations'>,
			firstName,
			lastName,
			email,
			message,
			referenceEmail,
		})
		revalidatePath('/organization/[id]')
	}
)

export const updateSignUpForm = action(
	updateMentorSignUpFormSchema,
	async ({ referenceResponse, signUpFormId }) => {
		await fetchMutation(api.mentorSignUpForm.patch, {
			id: signUpFormId as Id<'mentorSignUpForms'>,
			isComplete: true,
			referenceResponse,
		})
		revalidatePath('/dashboard/applications')
	}
)
