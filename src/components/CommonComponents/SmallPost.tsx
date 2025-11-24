'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { BlogsContentTypeEnum, IBlogResponse } from '@/types/blog.types'
import { IMultiLangText } from '@/types/shared/text.types'

import LinkWithArrow from './LinkWithArrow'
import { Link } from '@/i18n/navigation'

const SmallPost: React.FC<IBlogResponse> = props => {
	const [isDragging, setIsDragging] = useState(false)
	type Locale = keyof IMultiLangText
	const locale = useLocale() as Locale
	const tPost = useTranslations('LinkArrow')
	const t = useTranslations('BlogCategories')

	const handleMouseDown = () => {
		setIsDragging(false)
	}

	const handleMouseMove = () => {
		setIsDragging(true)
	}

	const handleClick = (e: React.MouseEvent) => {
		if (isDragging) {
			e.preventDefault()
			e.stopPropagation()
		}
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

	const getPathname = (type: BlogsContentTypeEnum) => {
		switch (type) {
			case 'NEWS':
				return {
					pathname: '/news/[news_id]',
					params: { news_id: props._id }
				} as const

			case 'PROJECT':
				return {
					pathname: '/projects/[projects_id]',
					params: { projects_id: props._id }
				} as const

			case 'AUTHENTIC_LOCAL':
				switch (props.authentic_local_category) {
					case 'LOCAL_PRODUCTS':
						return {
							pathname: '/authentic-local/local-products/[local_products_id]',
							params: { local_products_id: props._id }
						} as const

					case 'SERVICES':
						return {
							pathname: '/authentic-local/services/[services_id]',
							params: { services_id: props._id }
						} as const

					case 'TOURIST_ATTRACTIONS':
						return {
							pathname: '/authentic-local/tourist-attractions/[tourist_attractions_id]',
							params: { tourist_attractions_id: props._id }
						} as const

					case 'PEOPLE_AND_VALUES':
						return {
							pathname: '/authentic-local/people-and-values/[people_and_values_id]',
							params: { people_and_values_id: props._id }
						} as const

					default:
						return '/authentic-local' as const
				}

			default:
				return '/' as const
		}
	}

	const bgClasses = ['bg-forest-600', 'bg-forest-800', 'bg-forest-700', 'bg-forest-500']

	function hashString(str: string): number {
		let hash = 0
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) - hash + str.charCodeAt(i)
			hash |= 0
		}
		return Math.abs(hash)
	}

	function pickBgClass(seed: string) {
		const idx = hashString(seed) % bgClasses.length
		return bgClasses[idx]
	}

	const isMobile = useIsMobile()

	return (
		<Link
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onClick={handleClick}
			draggable='false'
			href={getPathname(props.content_type)}
			className='grid col-span-4 pointer select-none'
		>
			<div className='bg-sand-50 my-3 custom-shadow relative flex h-[483px] sm:h-[500px] flex-col rounded-2xl overflow-hidden cursor-pointer group'>
				<div className='h-1/3 sm:h-1/2 relative'>
					<div className='absolute top-4 left-4 z-10 flex flex-wrap gap-2'>
						{props.categories.slice(0, isMobile ? 2 : props.categories.length).map((tag, index) => {
							return (
								<div
									key={index}
									className={`${pickBgClass(tag)} py-1 px-4 text-sand-50 rounded-sm text-xs`}
								>
									{t(tag)}
								</div>
							)
						})}
					</div>
					<Image
						draggable='false'
						alt='image'
						src={props.main_image}
						fill
						style={{ objectFit: 'cover' }}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						unoptimized
					/>
				</div>
				<div className={`bg-stone-50 h-2/3 sm:h-1/2 px-4 pb-4 pt-6 flex justify-between flex-col`}>
					<h2 className='font-bold text-xl leading-6'>{props.title[locale]}</h2>
					<h4
						className='group-hover:opacity-100 leading-4.5 sm:line-clamp-4 line-clamp-6 opacity-100 sm:opacity-0 transition-opacity duration-300'
						dangerouslySetInnerHTML={{ __html: props.summary.column1[locale] }}
					/>
					<LinkWithArrow
						asBtn
						text={tPost('read_article')}
						href='/'
						arrowProps='group-hover:fill-forest-900 group-active:rotate-0 group-hover:rotate-0 -rotate-45 fill-sand-50'
						customStyle='flex w-full justify-between gap-1 items-center [&>div:nth-child(1)]:py-2.5
                       [&>div:nth-child(1)]:px-4 [&>div]:group-hover:bg-sand-50 [&>div]:bg-forest-800 [&>div]:group-hover:text-forest-900 [&>div]:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3.5'
					/>
				</div>
			</div>
		</Link>
	)
}
export default SmallPost
