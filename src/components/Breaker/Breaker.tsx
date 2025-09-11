'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

import { IMultiLangText } from '@/types/shared/text.types'

import AnimatedHeader from '../CommonComponents/AnimatedHeader'
import ParalaxImage from '../CommonComponents/ParalaxImage'

import { statisticsService } from '@/services/statistics.service'

const Breaker = () => {
	const tBreaker = useTranslations('index.Breaker')
	type Locale = keyof IMultiLangText
	const locale = useLocale() as Locale

	const { data } = useQuery({
		queryKey: ['statistics'],
		queryFn: () => statisticsService.getStatistics()
	})

	const title = data?.data?.title?.[locale] ?? ''
	const imageSrc = data?.data?.image

	return (
		<section className='w-screen grid grid-cols-full relative sm:px-8 my-40'>
			<AnimatedHeader
				customStyles='col-span-full sm:col-span-9 text-2xl sm:text-5xl h-fit font-bold sm:leading-13 leading-7 mb-6 sm:mb-8 sm:mt-0 mt-20'
				text={title}
			/>
			<div className='col-span-full aspect-[3/2] w-full sm:h-[640px] relative'>
				{imageSrc ? (
					<ParalaxImage
						source={imageSrc}
						altText={tBreaker('image_alt')}
					/>
				) : (
					<div
						className='h-full w-full bg-stone-400 animate-pulse rounded-lg'
						aria-label='Loading image'
					/>
				)}
			</div>
		</section>
	)
}

export default Breaker
