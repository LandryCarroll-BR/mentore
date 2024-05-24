'use client'

import { Role } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { Skeleton } from '@radix-ui/themes'
import { useConvexAuth } from 'convex/react'
import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'

export function Authenticated({
	children,
	allowedRoles,
}: PropsWithChildren<{ allowedRoles?: Role[] }>) {
	const { isLoading, isAuthenticated } = useConvexAuth()
	const user = useAuth()
	if (allowedRoles && !allowedRoles.includes(user.orgRole as Role)) return null
	if (!isLoading && !isAuthenticated) redirect('/sign-in')
	return <Skeleton loading={isLoading}>{user && children}</Skeleton>
}

export function RequiresOrg({ children }: PropsWithChildren) {
	const { isLoading } = useConvexAuth()
	const user = useAuth()
	if (!isLoading && !user.orgId) redirect('/create-organization')
	return <Skeleton loading={isLoading}>{user.orgId && children}</Skeleton>
}

export function OrgControl({
	children,
	afterOrganizationUrl,
}: PropsWithChildren<{ afterOrganizationUrl: string }>) {
	const { isLoading } = useConvexAuth()
	const user = useAuth()
	if (!isLoading && user.orgId) return redirect(afterOrganizationUrl)
	return <Skeleton loading={isLoading}>{!user.orgId && children}</Skeleton>
}
