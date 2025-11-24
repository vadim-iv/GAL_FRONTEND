'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'

import { BlogsContentTypeEnum, IBlogResponse } from '@/types/blog.types'
import { IMultiLangText } from '@/types/shared/text.types'

import LinkWithArrow from './LinkWithArrow'
import { Link } from '@/i18n/navigation'

const BigPost: React.FC<IBlogResponse> = props => {
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

	const formatDate = (isoDate?: string) => {
		if (!isoDate) return ''
		const date = new Date(isoDate)
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear()
		return `${day}.${month}.${year}`
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

	return (
		<Link
			href={getPathname(props.content_type)}
			draggable='false'
			className='bg-stone-50 group col-span-6 custom-shadow w-full h-[492px] sm:h-[605px] relative flex flex-col rounded-2xl overflow-hidden cursor-pointer select-none'
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onClick={handleClick}
		>
			<div className='sm:h-1/2 h-2/5 relative'>
				<div className='flex gap-2 absolute left-4 right-4 flex-wrap z-10 top-4 sm:hidden'>
					{props.categories.map(tag => {
						return (
							<div
								key={tag}
								className={`${pickBgClass(tag)} text-sand-50 text-xs py-1 px-3 rounded-sm`}
							>
								{t(tag)}
							</div>
						)
					})}
				</div>
				<Image
					draggable='false'
					alt='imagine'
					src={props.main_image}
					fill
					style={{ objectFit: 'cover' }}
					sizes='50vw'
					unoptimized
				/>
			</div>
			<div className='sm:h-1/2 h-3/5 px-4 sm:px-6 pt-6 pb-4 sm:py-8! flex flex-col justify-between group text-forest-900'>
				<div className='sm:flex hidden justify-between items-center w-full'>
					<div className='flex gap-2'>
						{props.categories.map(tag => {
							return (
								<div
									key={tag}
									className={`${pickBgClass(tag)} text-sand-50 text-xs py-1 px-3 rounded-sm`}
								>
									{t(tag)}
								</div>
							)
						})}
					</div>
					<span className='text-forest-900 text-xs font-bold'>{formatDate(props.createdAt)}</span>
				</div>
				<h2 className='font-bold text-xl leading-6'>{props.title[locale]}</h2>
				<h4
					className='leading-4.5 sm:line-clamp-3 line-clamp-5'
					dangerouslySetInnerHTML={{ __html: props.summary.column1[locale] }}
				/>
				<LinkWithArrow
					asBtn
					text={tPost('read_article')}
					href='/'
					arrowProps='group-hover:fill-forest-900 group-hover:rotate-0 -rotate-45 fill-sand-50'
					customStyle='flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5
                       [&>div:nth-child(1)]:px-4 [&>div]:group-hover:bg-sand-50 [&>div]:bg-forest-800 [&>div]:group-hover:text-forest-900 [&>div]:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3.5'
				/>
			</div>
		</Link>
	)
}

export default BigPost
