import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { IMemberAuthForm } from '@/types/platform-auth.types'

import { membersAuthService } from '@/services/members-auth.service'

export function useMemberLogin() {
	const t = useTranslations('Platform.ToastMessages')

	const { mutate: login, isPending: isLoginPending, isError } = useMutation({
		mutationKey: ['member login'],
		mutationFn: (data: IMemberAuthForm) => membersAuthService.login(data),
		onSuccess: () => {
			toast.success(t('loginSuccess'))
		},
		onError: error => {
			toast.error(errorCatch(error) || t('loginError'))
		}
	})

	return { login, isLoginPending, isError }
}
