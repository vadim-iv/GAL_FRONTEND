'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { ADMIN_PAGES } from '@/config/admin-pages.config'
import { IDecisionResponse } from '@/types/decision.types'

import { ArrowIcon } from '../Icons/ArrowIcon'
import { Button } from '../ui/Button'
import { DecisionStatusBadge } from '../ui/DecisionStatusBadge/DecisionStatusBadge'

import { Link } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

interface Props {
	decision: IDecisionResponse
	language: 'ro' | 'ru' | 'en'
}

export function DecisionCard({ decision, language }: Props) {
	const t = useTranslations('Admin')

	return (
		<Link href={ADMIN_PAGES.getDecisionEditPage(decision._id) as Pathnames} className='w-full h-full'>
			<div
				className='cursor-pointer w-full h-full flex flex-col bg-gray-300 rounded-[1rem] overflow-hidden group'
				style={{ boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.1)' }}
			>
				<div className='w-full relative h-[16.5rem] max-h-[16.5rem] shrink-0 bg-gray-400'>
					<div className='absolute top-[1rem] left-[1rem] z-10'>
						<DecisionStatusBadge status={decision.status} />
					</div>
					{decision.imageUrl && (
						<Image
							src={decision.imageUrl}
							alt='decision image'
							width={700}
							height={400}
							className='object-cover w-full h-full'
							draggable={false}
						/>
					)}
				</div>

				<div className='p-[1.5rem] flex flex-col justify-between h-full'>
					<div>
						<h2 className='line-clamp-2 font-bold text-green-700 text-[1.25rem] leading-[1.5rem]'>
							{decision.title[language]}
						</h2>

						<div
							className='line-clamp-3 text-green-700 font-[400] text-[1rem] leading-[1.125rem] mt-[1rem]'
							dangerouslySetInnerHTML={{ __html: decision.description[language] }}
						/>
					</div>

					<div className='flex items-center gap-[0.25rem] mt-[2rem] justify-between'>
						<Button className='w-fit font-[400] hover:bg-white h-[2.5rem] px-[1rem] bg-green-500 group-hover:bg-white text-white group-hover:text-green-700 transition-colors duration-300'>
							{t('edit')}
						</Button>
						<ArrowIcon className='bg-green-500 group-hover:rotate-0 -rotate-45 group-hover:bg-white [&>svg>path]:fill-white group-hover:[&>svg>path]:fill-green-500 transition-[colors_transform] duration-300' />
					</div>
				</div>
			</div>
		</Link>
	)
}
