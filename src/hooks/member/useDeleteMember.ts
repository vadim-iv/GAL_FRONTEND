import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { memberService } from '@/services/member.service'

export function useDeleteMember() {
	const t = useTranslations('Admin.ToastMessages')
	const queryClient = useQueryClient()

	const { mutate: deleteMember, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete member'],
		mutationFn: (id: string) => memberService.deleteMember(id),
		onSuccess: () => {
			toast.success(t('member_deleted'))
			queryClient.invalidateQueries({ queryKey: ['members'] })
			queryClient.invalidateQueries({ queryKey: ['management'] })
		},
		onError: () => {
			toast.error(t('member_deletion_failed'))
		}
	})

	return { deleteMember, isDeletePending }
}
