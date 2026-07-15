import { useQuery } from '@tanstack/react-query'

import { IGetProjectsParams } from '@/types/local-call.types'

import { localCallService } from '@/services/local-call.service'

export function useGetProjects(localCallId: string, params: IGetProjectsParams) {
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['projects', localCallId, params],
		queryFn: () => localCallService.getProjects(localCallId, params),
		enabled: !!localCallId
	})

	return { projects: data?.data, isLoading, isError, isSuccess }
}
