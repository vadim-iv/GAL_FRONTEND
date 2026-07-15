import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { TypeLocalCallFormState } from '@/types/local-call.types'

import { localCallService } from '@/services/local-call.service'

export function useCreateLocalCall() {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: createLocalCall, isPending: isCreatePending } = useMutation({
		mutationKey: ['create local call'],
		mutationFn: (data: TypeLocalCallFormState) => localCallService.createLocalCall(data),
		onSuccess: () => {
			toast.success(t('local_call_created'))
		},
		onError: error => {
			toast.error(errorCatch(error) || t('local_call_creation_failed'))
		}
	})

	return { createLocalCall, isCreatePending }
}
