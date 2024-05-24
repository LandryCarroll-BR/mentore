import '@radix-ui/themes/styles.css'
import '@/styles/globals.css'

import { ClerkProviders } from '@/components/providers'

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <ClerkProviders>{children}</ClerkProviders>
}
