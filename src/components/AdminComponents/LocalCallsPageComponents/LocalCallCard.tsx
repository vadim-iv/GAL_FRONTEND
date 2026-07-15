'use client'

import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { ADMIN_LOCAL_CALLS_TRANSLATE } from '@/constants/admin-local-calls-translate.data'
import { ADMIN_PAGES } from '@/config/admin-pages.config'
import { ILocalCallResponse } from '@/types/local-call.types'

import { ArrowIcon } from '../Icons/ArrowIcon'
import { Button } from '../ui/Button'

import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

interface Props {
	localCall: ILocalCallResponse
	language: 'ro' | 'ru' | 'en'
}

export function LocalCallCard({ localCall, language }: Props) {
	const t = useTranslations('Admin')
	const router = useRouter()

	return (
		<div
			className='cursor-pointer w-full h-full flex flex-col bg-gray-300 rounded-[1rem] overflow-hidden group'
			style={{ boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.1)' }}
			onClick={() => router.push(ADMIN_PAGES.getLocalCallEditPage(localCall._id) as Pathnames)}
		>
			<div className='w-full relative h-[16.5rem] max-h-[16.5rem] shrink-0 bg-gray-400'>
				{localCall.imageUrl && (
					<Image
						src={localCall.imageUrl}
						alt='local call image'
						width={700}
						height={400}
						className='object-cover w-full h-full'
						draggable={false}
					/>
				)}
			</div>

			<div className='p-[1.5rem] flex flex-col justify-between h-full'>
				<div>
					<div className='flex items-center justify-between'>
						<p className='font-bold text-green-700 text-[0.75rem] leading-[0.875rem]'>
							{ADMIN_LOCAL_CALLS_TRANSLATE.columnLabels.voteEnd[language]}: {format(localCall.voteEnd, 'dd.MM.yyyy')}
						</p>
					</div>

					<h2 className='line-clamp-2 font-bold text-green-700 text-[1.25rem] leading-[1.5rem] mt-[0.5rem]'>
						{localCall.name[language]}
					</h2>

					<div
						className='line-clamp-3 text-green-700 font-[400] text-[1rem] leading-[1.125rem] mt-[1rem]'
						dangerouslySetInnerHTML={{ __html: localCall.description[language] }}
					/>
				</div>

				<div className='flex items-center gap-[0.25rem] mt-[2rem] justify-between'>
					<div className='flex items-center gap-[0.5rem]'>
						<Button className='w-fit font-[400] hover:bg-white h-[2.5rem] px-[1rem] bg-green-500 group-hover:bg-white text-white group-hover:text-green-700 transition-colors duration-300'>
							{t('edit')}
						</Button>
						<Button
							onClick={e => {
								e.stopPropagation()
								router.push(ADMIN_PAGES.getLocalCallProjectsPage(localCall._id) as Pathnames)
							}}
							className='w-fit font-[400] hover:bg-white h-[2.5rem] px-[1rem] bg-green-500 group-hover:bg-white text-white group-hover:text-green-700 transition-colors duration-300'
						>
							{t('view_projects')}
						</Button>
					</div>
					<ArrowIcon className='bg-green-500 group-hover:rotate-0 -rotate-45 group-hover:bg-white [&>svg>path]:fill-white group-hover:[&>svg>path]:fill-green-500 transition-[colors_transform] duration-300' />
				</div>
			</div>
		</div>
	)
}
