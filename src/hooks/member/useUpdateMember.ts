import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { TypeMemberFormState } from '@/types/member.types'

import { memberService } from '@/services/member.service'

// Query invalidation is deliberately NOT done here — the caller may still have a
// pending image upload to run after this resolves, and invalidating early would
// refetch the member list while its imageUrl points at a not-yet-uploaded S3 object.
export function useUpdateMember(id: string) {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: updateMember, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update member'],
		mutationFn: (data: TypeMemberFormState) => memberService.updateMember(id, data),
		onSuccess: () => {
			toast.success(t('member_updated'))
		},
		onError: error => {
			toast.error(errorCatch(error) || t('member_update_failed'))
		}
	})

	return { updateMember, isUpdatePending }
}
