import { useQuery } from '@tanstack/react-query'

import { localCallService } from '@/services/local-call.service'

export function useGetLocalCallById(id: string) {
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['localCall', id],
		queryFn: () => localCallService.getLocalCallById(id),
		enabled: !!id
	})

	return { localCall: data?.data, isLoading, isError, isSuccess }
}
