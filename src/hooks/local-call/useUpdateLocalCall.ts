import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { TypeLocalCallFormState } from '@/types/local-call.types'

import { localCallService } from '@/services/local-call.service'

// Query invalidation is deliberately NOT done here — the caller may still have a
// pending image upload to run after this resolves, and invalidating early would
// refetch the list while imageUrl still points at a not-yet-uploaded S3 object.
export function useUpdateLocalCall(id: string) {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: updateLocalCall, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update local call'],
		mutationFn: (data: TypeLocalCallFormState) => localCallService.updateLocalCall(id, data),
		onSuccess: () => {
			toast.success(t('local_call_updated'))
		},
		onError: error => {
			toast.error(errorCatch(error) || t('local_call_update_failed'))
		}
	})

	return { updateLocalCall, isUpdatePending }
}
