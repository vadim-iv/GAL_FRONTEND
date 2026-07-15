'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { Pagination } from '@/components/AdminComponents/NewsGrid/NewsCard/Pagination'
import { VotableProjectCard } from '@/components/PlatformComponents/VotableProjectCard'
import { VoteWindowBanner } from '@/components/PlatformComponents/VoteWindowBanner'

import { IGetProjectsParams } from '@/types/local-call.types'

import { useGetLocalCallById } from '@/hooks/local-call/useGetLocalCallById'
import { useGetProjects } from '@/hooks/local-call/useGetProjects'

interface Props {
	localCallId: string
}

export function PageContent({ localCallId }: Props) {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const t = useTranslations('Platform')

	const [params, setParams] = useState<IGetProjectsParams>({ page: 1, limit: 9 })

	const { localCall, isLoading: isLocalCallLoading } = useGetLocalCallById(localCallId)
	const { projects, isLoading: isProjectsLoading } = useGetProjects(localCallId, params)

	const updatePage = (newPage: number) => {
		setParams(prev => ({ ...prev, page: newPage }))
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	if (isLocalCallLoading) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('loading')}</p>
	}

	if (!localCall) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('dataLoadFailed')}</p>
	}

	return (
		<div className='flex flex-col gap-[2rem]'>
			<div className='bg-white rounded-[1rem] border border-gray-500 p-[1.5rem] flex flex-col gap-[1rem]'>
				<h1 className='font-bold text-green-700 text-[1.5rem]'>{localCall.name[locale]}</h1>
				<div
					className='text-green-700 text-[1rem] leading-[1.5rem]'
					dangerouslySetInnerHTML={{ __html: localCall.description[locale] }}
				/>
				<VoteWindowBanner voteStart={localCall.voteStart} voteEnd={localCall.voteEnd} />
			</div>

			<div>
				<h2 className='font-bold text-green-700 text-[1.25rem] mb-[1rem]'>{t('projects')}</h2>

				{isProjectsLoading ? (
					<p className='text-green-700'>{t('loading')}</p>
				) : !projects || projects.projects.length === 0 ? (
					<p className='text-green-700'>{t('noProjects')}</p>
				) : (
					<>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5rem]'>
							{projects.projects.map(project => (
								<VotableProjectCard
									key={project._id}
									project={project}
									localCallId={localCallId}
									language={locale}
								/>
							))}
						</div>

						{projects.pagination.totalPages > 1 && (
							<div className='mt-[2rem]'>
								<Pagination
									pagination={{
										...projects.pagination,
										hasPreviousPage: projects.pagination.hasPrevPage
									}}
									updatePage={updatePage}
									currentPage={params.page || 1}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}
