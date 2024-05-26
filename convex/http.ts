import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { internal } from './_generated/api'
import type { WebhookEvent } from '@clerk/backend'
import { Webhook } from 'svix'

const http = httpRouter()

http.route({
	path: '/clerk-users-webhook',
	method: 'POST',
	handler: httpAction(async (ctx, request) => {
		const webhook = new Webhook(process.env.CLERK_WEBHOOK_USERS_SECRET!)
		const event = await validateRequest(request, webhook)
		if (!event) {
			return new Response('Error occured', { status: 400 })
		}
		switch (event.type) {
			case 'user.created': // intentional fallthrough
			case 'user.updated':
				await ctx.runMutation(internal.user.upsertFromClerk, {
					data: event.data,
				})
				break

			case 'user.deleted': {
				const clerkUserId = event.data.id!
				await ctx.runMutation(internal.user.deleteFromClerk, { clerkUserId })
				break
			}
			default:
				console.log('Ignored Clerk webhook event', event.type)
		}

		return new Response(null, { status: 200 })
	}),
})

http.route({
	path: '/clerk-organizations-webhook',
	method: 'POST',
	handler: httpAction(async (ctx, request) => {
		const webhook = new Webhook(process.env.CLERK_WEBHOOK_ORG_SECRET!)
		const event = await validateRequest(request, webhook)
		if (!event) {
			return new Response('Error occured', { status: 400 })
		}
		switch (event.type) {
			case 'organization.created': // intentional fallthrough
			case 'organization.updated':
				await ctx.runMutation(internal.organization.upsertFromClerk, {
					data: event.data,
				})
				break

			case 'organization.deleted': {
				const clerkOrgId = event.data.id!
				await ctx.runMutation(internal.organization.deleteFromClerk, { clerkOrgId })
				break
			}
			default:
				console.log('Ignored Clerk webhook event', event.type)
		}

		return new Response(null, { status: 200 })
	}),
})

http.route({
	path: '/clerk-organization-invitations-webhook',
	method: 'POST',
	handler: httpAction(async (ctx, request) => {
		const webhook = new Webhook(process.env.CLERK_WEBHOOK_ORG_INVITATION_SECRET!)
		const event = await validateRequest(request, webhook)
		if (!event) {
			return new Response('Error occured', { status: 400 })
		}

		switch (event.type) {
			case 'organizationInvitation.accepted': // intentional fallthrough
			case 'organizationInvitation.created':
				await ctx.runMutation(internal.organizationInvitation.upsertFromClerk, {
					data: event.data,
				})
				break

			case 'organizationInvitation.revoked': {
				const clerkOrgInvitationId = event.data.id!
				await ctx.runMutation(internal.organizationInvitation.deleteFromClerk, {
					clerkOrgInvitationId,
				})
				break
			}
			default:
				console.log('Ignored Clerk webhook event', event.type)
		}
		return new Response(null, { status: 200 })
	}),
})

http.route({
	path: '/clerk-organization-memberships-webhook',
	method: 'POST',
	handler: httpAction(async (ctx, request) => {
		const webhook = new Webhook(process.env.CLERK_WEBHOOK_ORG_MEMBERSHIP_SECRET!)
		const event = await validateRequest(request, webhook)
		if (!event) {
			return new Response('Error occured', { status: 400 })
		}

		switch (event.type) {
			case 'organizationMembership.created': // intentional fallthrough
			case 'organizationMembership.updated':
				await ctx.runMutation(internal.organizationMembership.upsertFromClerk, {
					data: event.data,
				})
				break

			case 'organizationMembership.deleted': {
				const clerkMembershipId = event.data.id!
				await ctx.runMutation(internal.organizationMembership.deleteFromClerk, {
					clerkMembershipId,
				})
				break
			}
			default:
				console.log('Ignored Clerk webhook event', event.type)
		}
		return new Response(null, { status: 200 })
	}),
})

async function validateRequest(req: Request, webhook: Webhook): Promise<WebhookEvent | null> {
	const payloadString = await req.text()
	const svixHeaders = {
		'svix-id': req.headers.get('svix-id')!,
		'svix-timestamp': req.headers.get('svix-timestamp')!,
		'svix-signature': req.headers.get('svix-signature')!,
	}
	try {
		return webhook.verify(payloadString, svixHeaders) as WebhookEvent
	} catch (error) {
		console.error('Error verifying webhook event', error)
		return null
	}
}

export default http
