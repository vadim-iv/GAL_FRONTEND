import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { TypeProjectFormState } from '@/types/local-call.types'

import { useGetLocalCallById } from './useGetLocalCallById'

// Projects have no standalone detail endpoint — they're fetched as part of their
// parent local call (already returns every project, unpaginated and complete).
export function useInitialProjectData(
	localCallId: string,
	projectId: string,
	reset: UseFormReset<TypeProjectFormState>
) {
	const { localCall, isSuccess, isLoading } = useGetLocalCallById(localCallId)

	const project = localCall?.projects.find(p => p._id === projectId)

	useEffect(() => {
		if (isSuccess && project) {
			reset({
				title: project.title,
				description: project.description,
				pdfUrl: project.pdfUrl,
				imageUrl: project.imageUrl,
				status: project.status
			})
		}
	}, [isSuccess, project, reset])

	return { project, isLoading }
}
