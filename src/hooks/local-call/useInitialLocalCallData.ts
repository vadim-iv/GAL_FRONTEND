import { format } from 'date-fns'
import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { TypeLocalCallFormState } from '@/types/local-call.types'

import { useGetLocalCallById } from './useGetLocalCallById'

export function useInitialLocalCallData(id: string, reset: UseFormReset<TypeLocalCallFormState>) {
	const { localCall, isSuccess, isLoading } = useGetLocalCallById(id)

	useEffect(() => {
		if (isSuccess && localCall) {
			reset({
				name: localCall.name,
				description: localCall.description,
				imageUrl: localCall.imageUrl,
				questions: localCall.questions,
				voteStart: format(new Date(localCall.voteStart), "yyyy-MM-dd'T'HH:mm"),
				voteEnd: format(new Date(localCall.voteEnd), "yyyy-MM-dd'T'HH:mm")
			})
		}
	}, [isSuccess, localCall, reset])

	return { isLoading }
}
