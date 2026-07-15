import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { redirectTabToPdfBlob } from '@/lib/pdf-download.utils'

import { decisionService } from '@/services/decision.service'

interface DownloadResultsPdfVariables {
	id: string
	lang: 'ro' | 'ru' | 'en'
	// Opened synchronously at click time by the caller (see openBlankTab in
	// pdf-download.utils) so redirecting it once the PDF arrives isn't blocked
	// as a popup.
	tab: Window | null
}

export function useDownloadResultsPdf() {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: downloadResultsPdf, isPending: isDownloadPending } = useMutation({
		mutationKey: ['download decision results pdf'],
		mutationFn: ({ id, lang }: DownloadResultsPdfVariables) => decisionService.downloadResultsPdf(id, lang),
		onSuccess: (response, variables) => {
			redirectTabToPdfBlob(variables.tab, response.data as Blob, 'decision-results.pdf')
		},
		onError: error => {
			toast.error(errorCatch(error) || t('pdf_generation_failed'))
		}
	})

	return { downloadResultsPdf, isDownloadPending }
}
