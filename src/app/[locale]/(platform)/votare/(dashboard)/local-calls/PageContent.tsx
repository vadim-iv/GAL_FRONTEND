'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { Pagination } from '@/components/AdminComponents/NewsGrid/NewsCard/Pagination'
import { VotableLocalCallCard } from '@/components/PlatformComponents/VotableLocalCallCard'

import { IGetLocalCallsParams } from '@/types/local-call.types'

import { useGetLocalCalls } from '@/hooks/local-call/useGetLocalCalls'

export function PageContent() {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const t = useTranslations('Platform')

	const [params, setParams] = useState<IGetLocalCallsParams>({ page: 1, limit: 9 })

	const { localCalls, isLoading } = useGetLocalCalls(params)

	const updatePage = (newPage: number) => {
		setParams(prev => ({ ...prev, page: newPage }))
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	if (isLoading) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('loading')}</p>
	}

	if (!localCalls) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('dataLoadFailed')}</p>
	}

	if (localCalls.localCalls.length === 0) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('noLocalCalls')}</p>
	}

	return (
		<div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5rem]'>
				{localCalls.localCalls.map(localCall => (
					<VotableLocalCallCard key={localCall._id} localCall={localCall} language={locale} />
				))}
			</div>

			{localCalls.pagination.totalPages > 1 && (
				<div className='mt-[2rem]'>
					<Pagination
						pagination={{
							...localCalls.pagination,
							hasPreviousPage: localCalls.pagination.hasPrevPage
						}}
						updatePage={updatePage}
						currentPage={params.page || 1}
					/>
				</div>
			)}
		</div>
	)
}
