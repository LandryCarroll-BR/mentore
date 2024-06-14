import { UserIdentity } from 'convex/server'
import { Doc } from '../_generated/dataModel'
import { ActionCtx, MutationCtx, QueryCtx } from '../_generated/server'
import { orgByExternalId } from '../organization'
import { userByExternalId } from '../user'

export async function enhanceMutationContext(
	ctx: MutationCtx,
	user: UserIdentity
): Promise<MutationCtx & { organization: Doc<'organizations'>; user: Doc<'users'> }> {
	if (!user.nickname) throw new Error('External organization not found')
	if (!user.subject) throw new Error('Clerk user not found')

	const dbOrganization = await orgByExternalId(ctx, user.nickname)
	const dbUser = await userByExternalId(ctx, user.subject)

	if (!dbOrganization) {
		throw new Error('Organization not found')
	}

	if (!dbUser) {
		throw new Error('User not found')
	}

	return { ...ctx, organization: dbOrganization, user: dbUser }
}

export async function enhanceQueryContext(
	ctx: QueryCtx,
	user: UserIdentity
): Promise<QueryCtx & { organization: Doc<'organizations'>; user: Doc<'users'> }> {
	if (!user.subject) throw new Error('Clerk user not found')
	if (!user.nickname) throw new Error('External organization not found')

	const dbUser = await userByExternalId(ctx, user.subject)
	const dbOrganization = await orgByExternalId(ctx, user.nickname)

	if (!dbUser) {
		throw new Error('User not found')
	}

	if (!dbOrganization) {
		throw new Error('Organization not found')
	}

	return { ...ctx, organization: dbOrganization, user: dbUser }
}
