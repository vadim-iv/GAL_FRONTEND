import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { errorCatch } from '@/api/error'

import { membersAuthService } from '@/services/members-auth.service'

export function useConfirmPasswordReset() {
	const t = useTranslations('Platform.ToastMessages')

	const {
		mutate: confirmPasswordReset,
		isPending: isConfirmPending,
		isSuccess,
		isError,
		error
	} = useMutation({
		mutationKey: ['confirm password reset'],
		mutationFn: (token: string) => membersAuthService.confirmPasswordReset(token)
	})

	const errorMessage = isError ? errorCatch(error) || t('resetPasswordFailed') : ''

	return { confirmPasswordReset, isConfirmPending, isSuccess, isError, errorMessage }
}
