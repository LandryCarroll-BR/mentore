import { Icons } from '@/components/icons'
import { SignUp } from '@clerk/nextjs'
import { Box, Container, Flex, Section } from '@radix-ui/themes'

export default function Home() {
	return (
		<main>
			<Container px={'5'}>
				<Flex width={'100%'} py={'4'} align={'center'} justify={'between'}>
					<Box>
						<Icons.Logo />
					</Box>
				</Flex>
			</Container>
			<Section>
				<Container>
					<Flex justify={'center'}>
						<SignUp />
					</Flex>
				</Container>
			</Section>
		</main>
	)
}
