import { auth, createClerkClient, currentUser } from '@clerk/nextjs/server'

export const clerk = createClerkClient({
	secretKey: 'sk_test_Y0FomNbUiTfoxoOyxt58p1vvhwDZajlZIqj9VHSCth',
})

export const getExternalOrg = () => {
	const user = auth()
	if (!user.orgId) return null
	return {
		externalOrgId: user.orgId,
	}
}

export const getExternalUser = async () => {
	const user = await currentUser()
	if (!user?.id || !user.primaryEmailAddress?.emailAddress) return null
	return {
		externalUserId: user.id,
		userEmail: user.primaryEmailAddress.emailAddress,
	}
}
