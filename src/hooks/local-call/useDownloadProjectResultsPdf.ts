import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { redirectTabToPdfBlob } from '@/lib/pdf-download.utils'

import { localCallService } from '@/services/local-call.service'

interface DownloadProjectResultsPdfVariables {
	id: string
	projectId: string
	lang: 'ro' | 'ru' | 'en'
	// Opened synchronously at click time by the caller (see openBlankTab in
	// pdf-download.utils) so redirecting it once the PDF arrives isn't blocked
	// as a popup.
	tab: Window | null
}

export function useDownloadProjectResultsPdf() {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: downloadProjectResultsPdf, isPending: isDownloadPending } = useMutation({
		mutationKey: ['download project results pdf'],
		mutationFn: ({ id, projectId, lang }: DownloadProjectResultsPdfVariables) =>
			localCallService.downloadProjectResultsPdf(id, projectId, lang),
		onSuccess: (response, variables) => {
			redirectTabToPdfBlob(variables.tab, response.data as Blob, 'project-results.pdf')
		},
		onError: error => {
			toast.error(errorCatch(error) || t('pdf_generation_failed'))
		}
	})

	return { downloadProjectResultsPdf, isDownloadPending }
}
