import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'

import { membersAuthService } from '@/services/members-auth.service'

export function useForgotPassword() {
	const t = useTranslations('Platform.ToastMessages')

	const {
		mutate: forgotPassword,
		isPending: isForgotPasswordPending,
		isSuccess
	} = useMutation({
		mutationKey: ['forgot password'],
		mutationFn: (email: string) => membersAuthService.forgotPassword(email),
		onError: error => {
			toast.error(errorCatch(error) || t('forgotPasswordFailed'))
		}
	})

	return { forgotPassword, isForgotPasswordPending, isSuccess }
}
