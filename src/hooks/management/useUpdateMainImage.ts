import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { managementService } from '@/services/management.service'

// Query invalidation is deliberately NOT done here — the caller may still have a
// pending image upload to run after this resolves, and invalidating early would
// refetch management data while main_image still points at a not-yet-uploaded S3 object.
export function useUpdateMainImage() {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: updateMainImage, isPending: isMainImageUpdatePending } = useMutation({
		mutationKey: ['update main image'],
		mutationFn: (main_image: string) => managementService.updateMainImage(main_image),
		onSuccess: () => {
			toast.success(t('management_updated'))
		},
		onError: () => {
			toast.error(t('management_update_failed'))
		}
	})

	return { updateMainImage, isMainImageUpdatePending }
}
