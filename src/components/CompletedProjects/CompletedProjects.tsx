'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Slider from 'react-slick'

import { IGetParams } from '@/types/blog.types'

import AnimatedHeader from '../CommonComponents/AnimatedHeader'
import AnimatedLine from '../CommonComponents/AnimatedLine'
import Arrow from '../CommonComponents/Arrow'
import BigPost from '../CommonComponents/BigPost'
import BigPostSkeleton from '../CommonComponents/BigPostSkeleton'
import LinkWithArrow from '../CommonComponents/LinkWithArrow'
import SmallPost from '../CommonComponents/SmallPost'

import { blogService } from '@/services/blog.service'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const CompletedProjects = () => {
	const t = useTranslations('index.CompletedProjects')
	const sliderRef = useRef<Slider>(null)
	const [currentSlide, setCurrentSlide] = useState(0)
	const [params, setParams] = useState<IGetParams>({ page: 1, limit: 12 })

	useEffect(() => {
		setParams({ page: 1, limit: 12 })
	}, [])

	const { data } = useQuery({
		queryKey: ['blogs', params],
		queryFn: () => blogService.getAllBlogs(params)
	})

	const projects = useMemo(() => data?.data?.blogs ?? [], [data])

	const desktopVisible = 2
	const totalSlides = projects.length

	const calcWidth = (index: number) => {
		if (totalSlides < 2) return 100
		return ((index % totalSlides) / (totalSlides - 1)) * 100
	}

	function useIsMobile(breakpoint = 640) {
		const [isMobile, setIsMobile] = useState(false)
		useEffect(() => {
			const check = () => setIsMobile(window.innerWidth < breakpoint)
			check()
			window.addEventListener('resize', check)
			return () => window.removeEventListener('resize', check)
		}, [breakpoint])
		return isMobile
	}

	const isMobile = useIsMobile()

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: isMobile ? 1.15 : desktopVisible,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		onInit: () => setCurrentSlide(0),
		beforeChange: (_: number, next: number) => {
			setCurrentSlide(next)
			sliderRef.current?.slickPause()
		},
		afterChange: () => {
			sliderRef.current?.slickPlay()
		},
		onSwipe: () => {
			sliderRef.current?.slickPause()
			sliderRef.current?.slickPlay()
		}
	}

	return !isMobile ? (
		<section className='w-screen min-h-screen relative bg-sand-50 flex items-center'>
			<div className='grid-cols-full grid py-24 relative w-full'>
				<AnimatedLine customStyles='col-span-full mb-4 sm:hidden' />
				<div className='col-span-full flex justify-between items-center mb-6 sm:mb-12'>
					<AnimatedHeader
						customStyles='sm:text-5xl text-2xl font-bold text-forest-900'
						text={t('completed_projects_header')}
					/>
					<div className='hidden sm:flex gap-2 items-center'>
						<button
							onClick={() => sliderRef.current?.slickPrev()}
							className='rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer size-10 flex items-center justify-center'
						>
							<Arrow arrowCustomStyle='-rotate-180 fill-sand-50' />
						</button>
						<button
							onClick={() => sliderRef.current?.slickNext()}
							className='rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer size-10 flex items-center justify-center'
						>
							<Arrow arrowCustomStyle='fill-sand-50' />
						</button>
					</div>
				</div>

				<div className='col-span-full overflow-x-hidden -mx-4'>
					<Slider
						ref={sliderRef}
						className='[&_.slick-slide]:px-3'
						{...settings}
					>
						{projects.length > 0
							? projects.map(project => (
									<div key={project._id}>
										<BigPost {...project} />
									</div>
								))
							: Array.from({ length: 3 }).map((_, i) => (
									<div key={`empty-${i}`}>
										<BigPostSkeleton />
									</div>
								))}
					</Slider>
				</div>

				<div className='col-span-full mt-12 flex flex-col items-center'>
					<div className='bg-stone-300 h-[2px] w-full'>
						<motion.div
							className='bg-forest-900 h-full'
							animate={{ width: `${calcWidth(currentSlide)}%` }}
							transition={{ ease: 'easeInOut' }}
						/>
					</div>
					<LinkWithArrow
						text={t('see_more_projects')}
						href='/projects'
						arrowProps='group-hover/link:rotate-0 -rotate-45 fill-sand-50'
						customStyle='flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5 [&>div:nth-child(1)]:px-4 [&>div]:text-sand-50 [&>div]:bg-forest-800 gap [&>div]:group-hover/link:bg-forest-700 [&>div]:group-hover/link:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3.5'
					/>
				</div>
			</div>
		</section>
	) : (
		<section className='w-full relative bg-sand-50 py-20'>
			<div className='max-w-[390px] mx-auto'>
				<div className='pl-4'>
					<AnimatedHeader
						customStyles='text-3xl font-bold text-forest-900 mb-8'
						text='Proiecte realizate'
					/>
					<Slider
						ref={sliderRef}
						{...settings}
					>
						{projects.length > 0
							? projects.map(project => (
									<div
										key={project._id}
										className='pr-4 h-full ml-[13vw] [@media(min-width:430px)_and_(max-width:500px)]:ml-[12vw] [@media(min-width:501px)_and_(max-width:649px)]:ml-[10vw]'
									>
										<SmallPost {...project} />
									</div>
								))
							: Array.from({ length: 3 }).map((_, i) => (
									<div
										key={`empty-${i}`}
										className='h-full ml-[13vw] sm:ml-0'
									>
										<BigPostSkeleton />
									</div>
								))}
					</Slider>

					<div className='mt-12 flex flex-col items-center pr-6'>
						<div className='bg-stone-300 h-[2px] w-full rounded-full'>
							<motion.div
								className='bg-forest-900 h-full rounded-full'
								animate={{ width: `${calcWidth(currentSlide)}%` }}
								transition={{ ease: 'easeInOut' }}
							/>
						</div>
						<div className='mt-12'>
							<LinkWithArrow
								text={t('see_more_projects')}
								href='/projects'
								arrowProps='group-hover/link:rotate-0 -rotate-45 fill-sand-50 sm:fill-forest-900'
								customStyle='flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5 [&>div:nth-child(1)]:px-4 [&>div]:bg-forest-700 [&>div]:text-sand-50 sm:[&>div]:text-forest-900 sm:[&>div]:bg-sand-50 gap [&>div]:group-hover/link:bg-stone-200 [&>div]:rounded-full [&>div:nth-child(2)]:p-3'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CompletedProjects
