'use client'

import { format } from 'date-fns'
import { AnimatePresence } from 'framer-motion'
import { FileText, SquarePen, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { ADMIN_DECISIONS_TRANSLATE } from '@/constants/admin-decisions-translate.data'
import { ADMIN_PAGES } from '@/config/admin-pages.config'
import { IDecisionResponse } from '@/types/decision.types'

import { toInlinePreview } from '@/lib/html-preview.utils'
import { openBlankTab } from '@/lib/pdf-download.utils'

import { useDeleteDecision } from '@/hooks/decision/useDeleteDecision'
import { useDownloadResultsPdf } from '@/hooks/decision/useDownloadResultsPdf'

import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

import { ConfirmDeleteModal } from '../ui/ConfirmDeleteModal/ConfirmDeleteModal'
import { DecisionStatusBadge } from '../ui/DecisionStatusBadge/DecisionStatusBadge'

interface Props {
	decision: IDecisionResponse
	language: 'ro' | 'ru' | 'en'
}

const CELL_CLASS = 'text-[0.875rem] font-[400] text-green-700 truncate'

// Not clickable as a whole (matches ProjectRow, not LocalCallRow) — only the
// explicit actions in the cluster navigate/act.
export function DecisionRow({ decision, language }: Props) {
	const t = useTranslations('Admin')
	const router = useRouter()
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const { deleteDecision } = useDeleteDecision()
	const { downloadResultsPdf } = useDownloadResultsPdf()

	return (
		<div className='flex items-center gap-[2rem] border border-gray-500 bg-gray-300 rounded-[1rem] px-[1rem] py-[0.75rem] min-h-22'>
			<p className={`w-[15rem] shrink-0 ${CELL_CLASS}`}>{decision.title[language]}</p>

			<div
				className={`flex-1 min-w-0 ${CELL_CLASS}`}
				dangerouslySetInnerHTML={{ __html: toInlinePreview(decision.description[language]) }}
			/>

			<p className={`w-[10rem] shrink-0 ${CELL_CLASS}`}>{format(decision.voteStart, 'dd.MM.yyyy')}</p>

			<p className={`w-[10rem] shrink-0 ${CELL_CLASS}`}>{format(decision.voteEnd, 'dd.MM.yyyy')}</p>

			<div className='w-[10rem] shrink-0'>
				<DecisionStatusBadge status={decision.status} />
			</div>

			<div className='ml-auto flex items-center gap-[1.5rem] shrink-0'>
				<div
					className='flex items-center gap-[0.375rem] cursor-pointer hover:opacity-70 transition-opacity duration-300'
					onClick={() => downloadResultsPdf({ id: decision._id, lang: language, tab: openBlankTab() })}
				>
					<FileText className='size-[1rem] shrink-0 text-green-700' />
					<p className='text-[0.875rem] text-green-700 underline whitespace-nowrap'>
						{ADMIN_DECISIONS_TRANSLATE.resultsPdfLabel[language]}
					</p>
				</div>

				<div
					className='flex items-center gap-[0.5rem] cursor-pointer hover:opacity-70 transition-opacity duration-300'
					onClick={() => router.push(ADMIN_PAGES.getDecisionEditPage(decision._id) as Pathnames)}
				>
					<p className='text-[0.875rem] text-gray-600 whitespace-nowrap'>{ADMIN_DECISIONS_TRANSLATE.modifyLabel[language]}</p>
					<SquarePen className='size-[1.25rem] text-gray-600' />
				</div>

				<X
					onClick={() => setIsDeleteModalOpen(true)}
					className='size-[1.25rem] shrink-0 text-black cursor-pointer hover:opacity-70 transition-opacity duration-300'
				/>
			</div>

			<AnimatePresence>
				{isDeleteModalOpen && (
					<ConfirmDeleteModal
						message={t('delete_decision_question')}
						handleDelete={() => deleteDecision(decision._id)}
						setDeleteModalOpen={setIsDeleteModalOpen}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}
