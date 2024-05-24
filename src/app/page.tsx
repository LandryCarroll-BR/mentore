import { Icons } from '@/components/icons'
import { Text, Box, Button, Container, Flex, Heading, Section } from '@radix-ui/themes'
import Link from 'next/link'

export default function Home() {
	return (
		<main>
			<Container>
				<Flex width={'100%'} py={'4'} px={'5'} align={'center'} justify={'between'}>
					<Box>
						<Icons.Logo />
					</Box>
					<Button asChild>
						<Link href="/dashboard">Dashboard</Link>
					</Button>
				</Flex>
			</Container>
			<Section>
				<Container>
					<Flex align={'center'} justify={'center'} gap={'5'} direction={'column'} px={'5'}>
						<Box>
							<Box maxWidth={'500px'}>
								<Heading
									as="h1"
									align={'center'}
									size={{ initial: '8', sm: '9' }}
									mb={'4'}
									wrap={'balance'}
								>
									We use technology to build bridges.
								</Heading>
								<Text as="p" align={'center'} size={{ initial: '3', sm: '5' }} wrap={'balance'}>
									Our platform fosters mentorship for people in correctional facilities,
									transforming lives.
								</Text>
							</Box>
						</Box>
						<Button highContrast size={'3'}>
							<Link href="/sign-up">Get started</Link>
						</Button>
					</Flex>
				</Container>
			</Section>
		</main>
	)
}
