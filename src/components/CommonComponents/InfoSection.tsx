import React, { ComponentProps } from 'react'

import AnimatedHeader from './AnimatedHeader'
import AnimatedLine from './AnimatedLine'
import AnimatedText from './AnimatedText'
import Arrow from './Arrow'
import ParalaxImage from './ParalaxImage'
import { Link } from '@/i18n/navigation'

type LinkHref = ComponentProps<typeof Link>['href']

export interface Breadcrumb {
	text: string
	link?: LinkHref
}

interface InfoSectionProps {
	tags: string[]
	headerText: string
	lastActualization?: string
	location: Breadcrumb[]
	imageSrc?: string
	imageAlt: string
	locale?: string
	isAdminOrDocs?: boolean
}

const InfoSection: React.FC<InfoSectionProps> = props => {
	const actualization = props.isAdminOrDocs
		? props.locale === 'ro'
			? 'Ultima actualizare'
			: props.locale === 'ru'
				? 'Последнее обновление'
				: 'Last actualization'
		: props.locale === 'ro'
			? 'Data publicării'
			: props.locale === 'ru'
				? 'Дата публикации'
				: 'Publication date'

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
		<section className='w-screen h-fit grid grid-cols-full relative text-forest-900 align-content-start pt-24'>
			<div className='sm:col-span-9 col-span-full flex flex-col mt-24'>
				<div className='flex gap-2 text-sand-50 items-center flex-wrap'>
					{props.tags.map((tag, index) => {
						return (
							<span
								key={index}
								className={`${pickBgClass(tag)} px-4 py-1 rounded-sm text-xs text-nowrap`}
							>
								{tag}
							</span>
						)
					})}
				</div>
				<AnimatedHeader
					text={props.headerText}
					customStyles='sm:leading-13 leading-6 sm:text-5xl text-xl font-bold my-4'
				/>
				{props.lastActualization && (
					<AnimatedText
						text={actualization + ' ' + props.lastActualization}
						customStyles='leading-4.5 sm:mb-6 font-bold sm:text-base text-xs'
					/>
				)}
			</div>

			<AnimatedLine customStyles='col-span-full mt-20 sm:mt-24 mb-2' />

			<div
				aria-label='Breadcrumb'
				className='space-x-1 w-full col-span-full'
			>
				{props.location.map((loc, index) => {
					const isLast = index === props.location.length - 1
					const baseClass = isLast ? 'text-forest-900' : 'text-stone-600'

					const Crumb =
						loc.link && !isLast ? (
							<Link
								href={loc.link}
								className={`${baseClass} hover:underline`}
							>
								{loc.text}
							</Link>
						) : (
							<span
								className={baseClass}
								aria-current={isLast ? 'page' : undefined}
							>
								{loc.text}
							</span>
						)

					return (
						<span
							key={index}
							className='items-center inline'
						>
							{Crumb}
							{!isLast && <Arrow arrowCustomStyle='fill-stone-600 ml-1 scale-75' />}
						</span>
					)
				})}
			</div>

			<div className='w-full sm:h-[40rem] aspect-[3/2] sm:aspect-auto overflow-hidden mt-11.5 sm:mt-6 rounded-2xl mb-20 sm:mb-40 col-span-full'>
				{props.imageSrc ? (
					<ParalaxImage
						source={props.imageSrc}
						altText={props.imageAlt}
					/>
				) : (
					<div
						className='h-full w-full bg-gray-500 animate-pulse rounded-lg'
						aria-label='Loading image'
					/>
				)}
			</div>
		</section>
	)
}

export default InfoSection
