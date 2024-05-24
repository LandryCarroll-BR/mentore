import type { Metadata } from 'next'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Mentore',
	description: 'We use technology to build bridges.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<Theme accentColor="jade" radius="large">
					{children}
				</Theme>
			</body>
		</html>
	)
}
