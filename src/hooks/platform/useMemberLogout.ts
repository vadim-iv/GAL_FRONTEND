import { useMutation } from '@tanstack/react-query'

import { membersAuthService } from '@/services/members-auth.service'

export function useMemberLogout() {
	const { mutate: logout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['member logout'],
		mutationFn: () => membersAuthService.logout()
	})

	return { logout, isLogoutPending }
}
