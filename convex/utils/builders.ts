import { z } from 'zod'
import { Doc } from '../_generated/dataModel'
import { MutationCtx, QueryCtx, mutation, query } from '../_generated/server'
import { enhanceMutationContext, enhanceQueryContext } from './enhancers'

export const queryWithZod = <Args extends { [key: string]: z.ZodTypeAny }, Returns>(argObject: {
	args: Args
	handler: (
		ctx: QueryCtx & { organization: Doc<'organizations'>; user: Doc<'users'> },
		arg: z.output<z.ZodObject<Args>>
	) => Promise<Returns>
}) => {
	return query(async (ctx, args: z.input<z.ZodObject<Args>>) => {
		const user = await ctx.auth.getUserIdentity()
		if (!user) throw new Error('User Identity not found')

		// Validate args using Zod
		const argsSchema = z.object(argObject.args)
		const validatedArgs = argsSchema.parse(args)

		// Enhance context with organization
		const enhancedCtx = await enhanceQueryContext(ctx, user)

		// Call the original handler with enhanced context and validated arguments
		return argObject.handler(enhancedCtx, validatedArgs)
	})
}

export const mutationWithZod = <Args extends { [key: string]: z.ZodTypeAny }, Returns>(argObject: {
	args: Args
	handler: (
		ctx: MutationCtx & { organization: Doc<'organizations'>; user: Doc<'users'> },
		arg: z.output<z.ZodObject<Args>>
	) => Promise<Returns>
}) => {
	return mutation(async (ctx, args: z.input<z.ZodObject<Args>>) => {
		const user = await ctx.auth.getUserIdentity()
		if (!user) throw new Error('User Identity not found')

		// Validate args using Zod
		const argsSchema = z.object(argObject.args)
		const validatedArgs = argsSchema.parse(args)

		// Enhance context with organization
		const enhancedCtx = await enhanceMutationContext(ctx, user)

		// Call the original handler with enhanced context and validated arguments
		return argObject.handler(enhancedCtx, validatedArgs)
	})
}
