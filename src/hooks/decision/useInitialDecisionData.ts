import { format } from 'date-fns'
import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { TypeDecisionFormState } from '@/types/decision.types'

import { useGetDecisionById } from './useGetDecisionById'

export function useInitialDecisionData(id: string, reset: UseFormReset<TypeDecisionFormState>) {
	const { decision, isSuccess, isLoading } = useGetDecisionById(id)

	useEffect(() => {
		if (isSuccess && decision) {
			reset({
				title: decision.title,
				description: decision.description,
				imageUrl: decision.imageUrl,
				status: decision.status,
				// `answers` is destructured out (not read) specifically to exclude it from the
				// form payload — the edit form must never submit votes back, or the backend
				// would overwrite them with the default empty array on save.
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				questions: decision.questions.map(({ answers, ...question }) => question),
				voteStart: format(new Date(decision.voteStart), "yyyy-MM-dd'T'HH:mm"),
				voteEnd: format(new Date(decision.voteEnd), "yyyy-MM-dd'T'HH:mm")
			})
		}
	}, [isSuccess, decision, reset])

	return { isLoading }
}
