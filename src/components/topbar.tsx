import { Flex } from '@radix-ui/themes'
import { UserButton } from './auth-buttons'

export function Topbar() {
	return (
		<Flex gap={'3'} height={'30px'}>
			<Flex ml={'auto'} align={'center'} gap={'3'}>
				<UserButton />
			</Flex>
		</Flex>
	)
}
