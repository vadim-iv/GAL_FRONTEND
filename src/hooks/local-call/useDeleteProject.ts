import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'

import { localCallService } from '@/services/local-call.service'

export function useDeleteProject(localCallId: string) {
	const t = useTranslations('Admin.ToastMessages')
	const queryClient = useQueryClient()

	const { mutate: deleteProject, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete project'],
		mutationFn: (projectId: string) => localCallService.deleteProject(localCallId, projectId),
		onSuccess: () => {
			toast.success(t('project_deleted'))
			queryClient.invalidateQueries({ queryKey: ['projects', localCallId] })
		},
		onError: error => {
			toast.error(errorCatch(error) || t('project_deletion_failed'))
		}
	})

	return { deleteProject, isDeletePending }
}
