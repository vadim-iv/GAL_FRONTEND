'use client'

import { Plus } from 'lucide-react'

import { ADMIN_PROJECTS_TRANSLATE } from '@/constants/admin-projects-translate.data'
import { ADMIN_PAGES } from '@/config/admin-pages.config'
import { IProjectResponse } from '@/types/local-call.types'

import { Link } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

import { ProjectRow } from './ProjectRow'
import { ProjectRowHeader } from './ProjectRowHeader'

interface Props {
	projects: IProjectResponse[]
	localCallId: string
	language: 'ro' | 'ru' | 'en'
}

export function ProjectsList({ projects, localCallId, language }: Props) {
	return (
		<div className='w-full mt-[1.5rem] flex justify-end'>
			<div className='w-full sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)]'>
				<ProjectRowHeader language={language} />

				<div className='mt-[0.5rem] flex flex-col gap-[1rem]'>
					{projects.map(project => (
						<ProjectRow key={project._id} project={project} localCallId={localCallId} language={language} />
					))}
				</div>

				<Link href={ADMIN_PAGES.getCreateProjectPage(localCallId) as Pathnames}>
					<div className='cursor-pointer hover:opacity-70 transition-opacity duration-300 w-full mt-[1rem] border border-dashed border-gray-500 bg-gray-400 rounded-[1rem] h-[6rem] flex items-center justify-center gap-[0.5rem]'>
						<Plus className='text-green-700 size-[1.25rem]' />
						<span className='text-[1rem] leading-[1.125rem] text-green-700 font-[400]'>
							{ADMIN_PROJECTS_TRANSLATE.addButtonLabel[language]}
						</span>
					</div>
				</Link>
			</div>
		</div>
	)
}
