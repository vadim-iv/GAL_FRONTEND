import { useQuery } from '@tanstack/react-query'

import { memberService } from '@/services/member.service'

export function useGetMembers() {
	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ['members'],
		queryFn: () => memberService.getAllMembers()
	})

	const members = data?.data

	return { members, isLoading, isError, isSuccess }
}
