'use client'

import { format } from 'date-fns'
import { AnimatePresence } from 'framer-motion'
import { SquarePen, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { ADMIN_LOCAL_CALLS_TRANSLATE } from '@/constants/admin-local-calls-translate.data'
import { ADMIN_PAGES } from '@/config/admin-pages.config'
import { ILocalCallResponse } from '@/types/local-call.types'

import { toInlinePreview } from '@/lib/html-preview.utils'

import { useDeleteLocalCall } from '@/hooks/local-call/useDeleteLocalCall'

import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

import { ConfirmDeleteModal } from '../ui/ConfirmDeleteModal/ConfirmDeleteModal'
import { VoteWindowStatusBadge } from '../ui/VoteWindowStatusBadge/VoteWindowStatusBadge'

interface Props {
	localCall: ILocalCallResponse
	language: 'ro' | 'ru' | 'en'
}

const CELL_CLASS = 'text-[0.875rem] font-[400] text-green-700 truncate'

export function LocalCallRow({ localCall, language }: Props) {
	const t = useTranslations('Admin')
	const router = useRouter()
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const { deleteLocalCall } = useDeleteLocalCall()

	return (
		<div
			className='flex items-center gap-[2rem] border border-gray-500 bg-gray-300 rounded-[1rem] px-[1rem] py-[0.75rem] min-h-22 cursor-pointer'
			onClick={() => router.push(ADMIN_PAGES.getLocalCallProjectsPage(localCall._id) as Pathnames)}
		>
			<p className='w-[14rem] shrink-0 text-[0.875rem] font-bold text-green-700 truncate'>{localCall.name[language]}</p>

			<div
				className={`flex-1 min-w-0 ${CELL_CLASS}`}
				dangerouslySetInnerHTML={{ __html: toInlinePreview(localCall.description[language]) }}
			/>

			<p className={`w-[10rem] shrink-0 ${CELL_CLASS}`}>{format(localCall.voteStart, 'dd.MM.yyyy')}</p>

			<p className={`w-[10rem] shrink-0 ${CELL_CLASS}`}>{format(localCall.voteEnd, 'dd.MM.yyyy')}</p>

			<div className='w-[10rem] shrink-0'>
				<VoteWindowStatusBadge voteStart={localCall.voteStart} voteEnd={localCall.voteEnd} />
			</div>

			<div className='ml-auto flex items-center gap-[1.5rem] shrink-0'>
				<div
					className='flex items-center gap-[0.5rem] cursor-pointer hover:opacity-70 transition-opacity duration-300'
					onClick={e => {
						e.stopPropagation()
						router.push(ADMIN_PAGES.getLocalCallEditPage(localCall._id) as Pathnames)
					}}
				>
					<p className='text-[0.875rem] text-gray-600 whitespace-nowrap'>{ADMIN_LOCAL_CALLS_TRANSLATE.modifyLabel[language]}</p>
					<SquarePen className='size-[1.25rem] text-gray-600' />
				</div>

				<X
					onClick={e => {
						e.stopPropagation()
						setIsDeleteModalOpen(true)
					}}
					className='size-[1.25rem] shrink-0 text-black cursor-pointer hover:opacity-70 transition-opacity duration-300'
				/>
			</div>

			<AnimatePresence>
				{isDeleteModalOpen && (
					<ConfirmDeleteModal
						message={t('delete_local_call_question')}
						handleDelete={() => deleteLocalCall(localCall._id)}
						setDeleteModalOpen={setIsDeleteModalOpen}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}
