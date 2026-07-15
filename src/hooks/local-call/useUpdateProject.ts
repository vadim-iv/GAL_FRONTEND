import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { TypeProjectFormState } from '@/types/local-call.types'

import { localCallService } from '@/services/local-call.service'

// Query invalidation is deliberately NOT done here — see useUpdateLocalCall.ts.
export function useUpdateProject(localCallId: string, projectId: string) {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: updateProject, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update project'],
		mutationFn: (data: TypeProjectFormState) =>
			localCallService.updateProject(localCallId, projectId, data),
		onSuccess: () => {
			toast.success(t('project_updated'))
		},
		onError: error => {
			toast.error(errorCatch(error) || t('project_update_failed'))
		}
	})

	return { updateProject, isUpdatePending }
}
