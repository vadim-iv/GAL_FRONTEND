'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { DecisionsGrid } from '@/components/AdminComponents/DecisionsPageComponents/DecisionsGrid'
import { DecisionsList } from '@/components/AdminComponents/DecisionsPageComponents/DecisionsList'
import { Pagination } from '@/components/AdminComponents/NewsGrid/NewsCard/Pagination'
import { SkeletonGrid } from '@/components/AdminComponents/NewsGrid/SkeletonGrid'
import { SkeletonList } from '@/components/AdminComponents/NewsGrid/SkeletonList'
import { Button } from '@/components/AdminComponents/ui/Button'
import { ViewModeToggle } from '@/components/AdminComponents/ui/ViewModeToggle/ViewModeToggle'

import { ADMIN_PAGES } from '@/config/admin-pages.config'
import { IGetDecisionsParams } from '@/types/decision.types'

import { useGetDecisions } from '@/hooks/decision/useGetDecisions'

import { Link } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

export function PageContent() {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const t = useTranslations('Admin')

	const [mode, setMode] = useState<'list' | 'grid'>('list')
	const [params, setParams] = useState<IGetDecisionsParams>({ page: 1, limit: 11 })

	const { decisions, isLoading } = useGetDecisions(params)

	const updatePage = (newPage: number) => {
		setParams(prev => ({ ...prev, page: newPage }))
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<div className='mt-[2.5rem]'>
			<ViewModeToggle mode={mode} setMode={setMode} />

			{isLoading ? (
				mode === 'grid' ? (
					<SkeletonGrid colsNumber={3} numberOfSkeletons={params.limit} />
				) : (
					<SkeletonList numberOfSkeletons={params.limit} />
				)
			) : decisions ? (
				decisions.decisions.length > 0 ? (
					<>
						<AnimatePresence mode='wait' initial={false}>
							<motion.div
								key={mode}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5, ease: 'easeInOut' }}
							>
								{mode === 'grid' ? (
									<DecisionsGrid decisions={decisions.decisions} language={locale} />
								) : (
									<DecisionsList decisions={decisions.decisions} language={locale} />
								)}
							</motion.div>
						</AnimatePresence>
						{decisions.pagination.totalPages > 1 && (
							<div className='w-full flex justify-end'>
								<div className='w-full sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)]'>
									<Pagination
										pagination={{
											...decisions.pagination,
											hasPreviousPage: decisions.pagination.hasPrevPage
										}}
										updatePage={updatePage}
										currentPage={params.page || 1}
									/>
								</div>
							</div>
						)}
					</>
				) : (
					<div className='h-[calc(100vh-15rem)] grid place-content-center'>
						<div className='text-center'>
							<p className='text-green-700 text-[1.25rem] mb-2'>{t('no_decisions')}</p>
							<p className='text-gray-600 text-[0.875rem]'>{t('no_decisions_message')}</p>
							<Link href={ADMIN_PAGES.CREATE_DECISION as Pathnames}>
								<Button type='button' className='w-fit px-[2rem] h-[2.5rem] mt-[1rem] font-[400]'>
									{t('create_one')}
								</Button>
							</Link>
						</div>
					</div>
				)
			) : (
				<div className='h-[calc(100vh-15rem)] grid place-content-center'>
					<p className='text-green-700 text-[1.25rem] text-center'>{t('data_load_failed')}</p>
				</div>
			)}
		</div>
	)
}
