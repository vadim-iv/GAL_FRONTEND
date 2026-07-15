import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { TypeProjectFormState } from '@/types/local-call.types'

import { localCallService } from '@/services/local-call.service'

// Query invalidation is deliberately NOT done here — see useUpdateLocalCall.ts.
export function useAddProject(localCallId: string) {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: addProject, isPending: isCreatePending } = useMutation({
		mutationKey: ['add project'],
		mutationFn: (data: TypeProjectFormState) => localCallService.addProject(localCallId, data),
		onSuccess: () => {
			toast.success(t('project_created'))
		},
		onError: error => {
			toast.error(errorCatch(error) || t('project_creation_failed'))
		}
	})

	return { addProject, isCreatePending }
}
