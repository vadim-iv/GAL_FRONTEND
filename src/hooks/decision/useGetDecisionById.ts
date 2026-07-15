import { useQuery } from '@tanstack/react-query'

import { decisionService } from '@/services/decision.service'

export function useGetDecisionById(id: string) {
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['decision', id],
		queryFn: () => decisionService.getDecisionById(id),
		enabled: !!id
	})

	return { decision: data?.data, isLoading, isError, isSuccess }
}
