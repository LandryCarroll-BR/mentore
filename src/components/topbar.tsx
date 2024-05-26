import { Box, Flex } from '@radix-ui/themes'
import { UserButton } from './auth-buttons'
import { MobileSidebar } from './sidebar'

export function Topbar() {
	return (
		<Flex gap={'3'} height={'30px'}>
			<Flex>
				{/* <Box className="block md:hidden">
					<MobileSidebar />
				</Box> */}
			</Flex>
			<Flex ml={'auto'} align={'center'} gap={'3'}>
				<UserButton />
			</Flex>
		</Flex>
	)
}
