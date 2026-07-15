'use client'

import { AnimatePresence } from 'framer-motion'
import { FileText, SquarePen, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { ADMIN_PROJECTS_TRANSLATE } from '@/constants/admin-projects-translate.data'
import { ADMIN_PAGES } from '@/config/admin-pages.config'
import { IProjectResponse } from '@/types/local-call.types'

import { toInlinePreview } from '@/lib/html-preview.utils'

import { useDeleteProject } from '@/hooks/local-call/useDeleteProject'
import { useDownloadProjectResultsPdf } from '@/hooks/local-call/useDownloadProjectResultsPdf'

import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

import { ConfirmDeleteModal } from '../ui/ConfirmDeleteModal/ConfirmDeleteModal'
import { StatusBadge } from '../ui/StatusBadge/StatusBadge'

interface Props {
	project: IProjectResponse
	localCallId: string
	language: 'ro' | 'ru' | 'en'
}

const CELL_CLASS = 'text-[0.875rem] font-[400] text-green-700 truncate'

export function ProjectRow({ project, localCallId, language }: Props) {
	const t = useTranslations('Admin')
	const router = useRouter()
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const { deleteProject } = useDeleteProject(localCallId)
	const { downloadProjectResultsPdf, isDownloadPending } = useDownloadProjectResultsPdf()

	return (
		<div className='flex items-center gap-[2rem] border border-gray-500 bg-gray-300 rounded-[1rem] px-[1rem] py-[0.75rem] min-h-22'>
			<p className={`w-[15rem] shrink-0 ${CELL_CLASS}`}>{project.title[language]}</p>

			<div
				className={`flex-1 min-w-0 ${CELL_CLASS}`}
				dangerouslySetInnerHTML={{ __html: toInlinePreview(project.description[language]) }}
			/>

			<a
				href={project.pdfUrl}
				target='_blank'
				rel='noopener noreferrer'
				onClick={e => e.stopPropagation()}
				className='w-[15rem] shrink-0 flex items-center gap-[0.375rem] text-[0.875rem] font-[400] text-green-700 hover:opacity-70 transition-opacity duration-300'
			>
				<FileText className='size-[1rem] shrink-0' />
				<span className='underline truncate'>{ADMIN_PROJECTS_TRANSLATE.seePdfLabel[language]}</span>
			</a>

			<div className='w-[10rem] shrink-0'>
				<StatusBadge status={project.status} />
			</div>

			<div className='ml-auto flex items-center gap-[1.5rem] shrink-0'>
				<div
					className={`flex items-center gap-[0.375rem] transition-opacity duration-300 ${
						isDownloadPending ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:opacity-70'
					}`}
					onClick={() =>
						!isDownloadPending && downloadProjectResultsPdf({ id: localCallId, projectId: project._id, lang: language })
					}
				>
					<FileText className='size-[1rem] shrink-0 text-green-700' />
					<p className='text-[0.875rem] text-green-700 underline whitespace-nowrap'>
						{isDownloadPending
							? ADMIN_PROJECTS_TRANSLATE.generatingPdfLabel[language]
							: ADMIN_PROJECTS_TRANSLATE.resultsPdfLabel[language]}
					</p>
				</div>

				<div
					className='flex items-center gap-[0.5rem] cursor-pointer hover:opacity-70 transition-opacity duration-300'
					onClick={() => router.push(ADMIN_PAGES.getProjectEditPage(localCallId, project._id) as Pathnames)}
				>
					<p className='text-[0.875rem] text-gray-600 whitespace-nowrap'>{ADMIN_PROJECTS_TRANSLATE.modifyLabel[language]}</p>
					<SquarePen className='size-[1.25rem] text-gray-600' />
				</div>

				<X
					onClick={() => setIsDeleteModalOpen(true)}
					className='size-[1.25rem] text-black cursor-pointer hover:opacity-70 transition-opacity duration-300 shrink-0'
				/>
			</div>

			<AnimatePresence>
				{isDeleteModalOpen && (
					<ConfirmDeleteModal
						message={t('delete_project_question')}
						handleDelete={() => deleteProject(project._id)}
						setDeleteModalOpen={setIsDeleteModalOpen}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}
