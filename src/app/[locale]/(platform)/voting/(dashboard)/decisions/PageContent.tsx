'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { Pagination } from '@/components/AdminComponents/NewsGrid/NewsCard/Pagination'
import { VotableDecisionCard } from '@/components/PlatformComponents/VotableDecisionCard'

import { IGetDecisionsParams } from '@/types/decision.types'

import { useGetDecisions } from '@/hooks/decision/useGetDecisions'

export function PageContent() {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const t = useTranslations('Platform')

	const [params, setParams] = useState<IGetDecisionsParams>({ page: 1, limit: 9 })

	const { decisions, isLoading } = useGetDecisions(params)

	const updatePage = (newPage: number) => {
		setParams(prev => ({ ...prev, page: newPage }))
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	if (isLoading) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('loading')}</p>
	}

	if (!decisions) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('dataLoadFailed')}</p>
	}

	if (decisions.decisions.length === 0) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('noDecisions')}</p>
	}

	return (
		<div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5rem]'>
				{decisions.decisions.map(decision => (
					<VotableDecisionCard key={decision._id} decision={decision} language={locale} />
				))}
			</div>

			{decisions.pagination.totalPages > 1 && (
				<div className='mt-[2rem]'>
					<Pagination
						pagination={{
							...decisions.pagination,
							hasPreviousPage: decisions.pagination.hasPrevPage
						}}
						updatePage={updatePage}
						currentPage={params.page || 1}
					/>
				</div>
			)}
		</div>
	)
}
