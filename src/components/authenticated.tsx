'use client'

import { Role } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import { Skeleton } from '@radix-ui/themes'
import { useConvexAuth } from 'convex/react'
import { PropsWithChildren } from 'react'
import { redirect, useRouter } from 'next/navigation'

export function Authenticated({
	children,
	allowedRoles,
	personalOnly,
}: PropsWithChildren<{ allowedRoles?: Role[]; personalOnly?: boolean }>) {
	const { isLoading, isAuthenticated } = useConvexAuth()
	const user = useAuth()
	if (allowedRoles && !allowedRoles.includes(user.orgRole as Role)) return null
	if (personalOnly && user.orgId) return null
	if (!isLoading && !isAuthenticated) return null
	return <Skeleton loading={isLoading}>{user && children}</Skeleton>
}

export function RequiresOrg({ children }: PropsWithChildren) {
	const { isLoading } = useConvexAuth()
	const user = useAuth()
	const router = useRouter()
	if (!isLoading && !user.orgId) router.push('/create-organization')
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
