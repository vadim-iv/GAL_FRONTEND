import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { openPdfBlobInNewTab } from '@/lib/pdf-download.utils'

import { decisionService } from '@/services/decision.service'

export function useDownloadResultsPdf() {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: downloadResultsPdf, isPending: isDownloadPending } = useMutation({
		mutationKey: ['download decision results pdf'],
		mutationFn: ({ id, lang }: { id: string; lang: 'ro' | 'ru' | 'en' }) =>
			decisionService.downloadResultsPdf(id, lang),
		onSuccess: response => {
			openPdfBlobInNewTab(response.data as Blob, 'decision-results.pdf')
		},
		onError: error => {
			toast.error(errorCatch(error) || t('pdf_generation_failed'))
		}
	})

	return { downloadResultsPdf, isDownloadPending }
}
