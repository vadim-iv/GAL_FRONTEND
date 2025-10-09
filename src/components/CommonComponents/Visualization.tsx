'use client'

import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import React, { useLayoutEffect, useRef, useState } from 'react'

import { AuthenticLocalCategoriesEnum, BlogsContentTypeEnum, IGetParams } from '@/types/blog.types'

import { Pagination } from '../AdminComponents/NewsGrid/NewsCard/Pagination'

import AnimatedLine from './AnimatedLine'
import AnimatedText from './AnimatedText'
import BigPost from './BigPost'
import ColumnIcon from './ColumnIcon'
import GridIcon from './GridIcon'
import PostSkeleton from './PostSkeleton'
import SmallPost from './SmallPost'
import { blogService } from '@/services/blog.service'

interface VisualisationProps {
	header: string
	description: string
	type: string
	authenticType?: string
}

const itemVariants = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { duration: 0.2 } },
	exit: { opacity: 0, transition: { duration: 0.2 } }
}

const Visualization: React.FC<VisualisationProps> = props => {
	const [visualisationType, setVisualisationType] = useState(true)
	// În mod implicit va fi grid, adică true = grid
	const [params, setParams] = useState<IGetParams>({
		page: 1,
		limit: 12,
		authentic_local_category: props.authenticType as AuthenticLocalCategoriesEnum,
		...(props.type !== 'NEWS' && {
			content_type: props.type as BlogsContentTypeEnum
		})
	})

	const sectionRef = useRef<HTMLElement | null>(null)
	const [shouldScroll, setShouldScroll] = useState(false)

	const updatePage = (newPage: number) => {
		setParams(prev => ({ ...prev, page: newPage }))
		setShouldScroll(true)
	}

	const { data, isLoading } = useQuery({
		queryKey: ['blogs', params],
		queryFn: () => blogService.getAllBlogs(params)
	})

	useLayoutEffect(() => {
		if (shouldScroll && sectionRef.current) {
			sectionRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
			setShouldScroll(false)
		}
	}, [data])

	const t = useTranslations('Visialization_type')

	return (
		<section
			ref={sectionRef}
			className='w-screen h-fit grid grid-cols-full relative text-forest-900'
		>
			<AnimatedLine customStyles='col-span-full mb-2' />
			<AnimatedText
				text={props.header}
				customStyles='sm:col-span-2 col-span-full font-bold mb-12'
			/>
			<AnimatedText
				text={props.description}
				customStyles='sm:col-span-4 sm:col-start-4 col-span-full mb-20 sm:mb-24'
			/>
			<div className='col-span-2 col-start-11 flex-col hidden sm:flex'>
				<AnimatedText
					text={t('type')}
					customStyles='text-right font-bold'
				/>
				<div className='flex justify-end gap-1 mt-2'>
					<button
						onClick={() => setVisualisationType(true)}
						className={`size-10 transition duration-300 small-custom-shadow relative ${
							!visualisationType ? 'bg-stone-50' : 'bg-forest-800'
						} rounded-full cursor-pointer flex justify-center items-center`}
					>
						<ColumnIcon color={!visualisationType ? 'fill-forest-800' : 'fill-stone-50'} />
					</button>
					<button
						onClick={() => setVisualisationType(false)}
						className={`size-10 transition duration-300 small-custom-shadow relative ${
							!visualisationType ? 'bg-forest-800' : 'bg-stone-50'
						} rounded-full cursor-pointer flex justify-center items-center`}
					>
						<GridIcon color={!visualisationType ? 'fill-stone-50' : 'fill-forest-800'} />
					</button>
				</div>
			</div>
			{isLoading ? (
				<PostSkeleton />
			) : data ? (
				<motion.div className='col-span-full sm:grid sm:grid-cols-12 gap-6'>
					<AnimatePresence mode='wait'>
						{data?.data.blogs.map((item, index) =>
							visualisationType ? (
								<motion.div
									key={'big-' + index}
									variants={itemVariants}
									initial='hidden'
									animate='show'
									exit='exit'
									className='sm:col-span-6 mb-12'
								>
									<BigPost {...item} />
								</motion.div>
							) : (
								<motion.div
									key={'small-' + index}
									variants={itemVariants}
									initial='hidden'
									animate='show'
									exit='exit'
									className='col-span-4 [&>div]:bg-amber-600!'
								>
									<SmallPost {...item} />
								</motion.div>
							)
						)}
					</AnimatePresence>
				</motion.div>
			) : (
				<div className='h-[calc(100vh-15rem)] grid place-content-center'>
					<p className='text-green-700 text-[1.25rem] text-center'>Nu s-a putut încărca</p>
				</div>
			)}
			{data && (
				<div className='col-span-full flex justify-center sm:mt-0 -mt-16 sm:mb-0 mb-12 items-center w-full'>
					<Pagination
						pagination={data.data.pagination}
						updatePage={updatePage}
						currentPage={params.page || 1}
					/>
				</div>
			)}
		</section>
	)
}

export default Visualization
