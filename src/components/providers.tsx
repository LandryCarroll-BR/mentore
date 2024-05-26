'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'

export function ClerkProviders({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
			<ConvexClerkProvider>{children}</ConvexClerkProvider>
		</ClerkProvider>
	)
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string)

export function ConvexClerkProvider({ children }: { children: React.ReactNode }) {
	const user = useAuth()
	return (
		<ConvexProviderWithClerk key={user.orgId} client={convex} useAuth={useAuth}>
			{children}
		</ConvexProviderWithClerk>
	)
}
