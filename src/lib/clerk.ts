import { createClerkClient } from '@clerk/nextjs/server'

export const clerk = createClerkClient({
	secretKey: 'sk_test_Y0FomNbUiTfoxoOyxt58p1vvhwDZajlZIqj9VHSCth',
})
