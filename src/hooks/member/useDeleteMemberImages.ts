import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { memberService } from "@/services/member.service"

export function useDeleteMemberImages() {
  const t = useTranslations("Admin.ToastMessages")

  const { mutate: deleteImages, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete images'],
    mutationFn: async (imageUrls: string[]) => memberService.deleteImages(imageUrls),
    onSuccess: () => {
        toast.success(t('images_deleted'))
    },
    onError: () => {
        toast.error(t('images_deletion_failed'))
    }
  })
  return { deleteImages, isDeletePending }
}
