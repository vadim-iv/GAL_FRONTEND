import { useQuery } from '@tanstack/react-query'

import { IGetDecisionsParams } from '@/types/decision.types'

import { decisionService } from '@/services/decision.service'

export function useGetDecisions(params: IGetDecisionsParams) {
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['decisions', params],
		queryFn: () => decisionService.getAllDecisions(params)
	})

	return { decisions: data?.data, isLoading, isError, isSuccess }
}
