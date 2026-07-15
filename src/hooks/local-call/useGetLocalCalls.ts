import { useQuery } from '@tanstack/react-query'

import { IGetLocalCallsParams } from '@/types/local-call.types'

import { localCallService } from '@/services/local-call.service'

export function useGetLocalCalls(params: IGetLocalCallsParams) {
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['localCalls', params],
		queryFn: () => localCallService.getAllLocalCalls(params)
	})

	return { localCalls: data?.data, isLoading, isError, isSuccess }
}
