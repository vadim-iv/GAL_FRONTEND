import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { TypeMemberFormState } from '@/types/member.types'

import { memberService } from '@/services/member.service'

// Query invalidation is deliberately NOT done here — the caller may still have a
// pending image upload to run after this resolves, and invalidating early would
// refetch the member list while its imageUrl points at a not-yet-uploaded S3 object.
export function useCreateMember() {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: createMember, isPending: isCreatePending } = useMutation({
		mutationKey: ['create member'],
		mutationFn: (data: TypeMemberFormState) => memberService.createMember(data),
		onSuccess: () => {
			toast.success(t('member_created'))
		},
		onError: error => {
			toast.error(errorCatch(error) || t('member_creation_failed'))
		}
	})

	return { createMember, isCreatePending }
}
