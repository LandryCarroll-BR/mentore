'use client'

import {
	OrganizationSwitcher,
	SignInButton,
	SignUpButton,
	UserButton as ClerkUserButton,
} from '@clerk/nextjs'
import { Box, Button } from '@radix-ui/themes'
import { Unauthenticated } from 'convex/react'
import { Authenticated } from '@/components/authenticated'

export function SignInAndSignUpButtons() {
	return (
		<Unauthenticated>
			<Button variant="outline" asChild>
				<SignInButton mode="modal">Sign in</SignInButton>
			</Button>
			<Button asChild>
				<SignUpButton mode="modal">Sign up</SignUpButton>
			</Button>
		</Unauthenticated>
	)
}

export function OrganizationButton() {
	return (
		<Authenticated>
			<Box
				minHeight={'34px'}
				width={'100vw'}
				maxWidth={'200px'}
				className="[&_.cl-rootBox]:!w-full [&_.cl-organizationSwitcherTriggerIcon]:!ml-auto [&_.cl-organizationSwitcherTrigger]:!border-sage-6 [&_.cl-organizationSwitcherTrigger]:!border [&_.cl-organizationSwitcherTrigger]:!py-1.5"
			>
				<OrganizationSwitcher
					hidePersonal
					skipInvitationScreen
					afterLeaveOrganizationUrl="/create-organization"
					appearance={{
						elements: {
							button: {
								minWidth: '100% !important',
								justifyContent: 'flex-start !important',
							},
						},
					}}
					defaultOpen
				/>
			</Box>
		</Authenticated>
	)
}

export function UserButton() {
	return (
		<Authenticated>
			<Box width={'28px'} height={'28px'} className="rounded-full">
				<ClerkUserButton afterSignOutUrl="/" />
			</Box>
		</Authenticated>
	)
}
