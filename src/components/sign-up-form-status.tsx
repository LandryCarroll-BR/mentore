import { api } from '@/convex/_generated/api'
import { currentUser } from '@clerk/nextjs/server'
import { fetchQuery } from 'convex/nextjs'

export async function SignUpFormStatus() {
	const user = await currentUser()
	if (!user?.primaryEmailAddress) return
	const data = await fetchQuery(api.mentorSignUpForm.getByEmail, {
		email: user?.primaryEmailAddress.emailAddress,
	})
	return <div>{data.map((data) => (data.isComplete ? 'true' : 'false'))}</div>
}
