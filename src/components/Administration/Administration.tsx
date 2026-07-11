'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

import { IMultiLangText } from '@/types/shared/text.types'
import Image from 'next/image'
import AnimatedHeader from '../CommonComponents/AnimatedHeader'
import AnimatedLine from '../CommonComponents/AnimatedLine'
import AnimatedText from '../CommonComponents/AnimatedText'
import InfoSection, { Breadcrumb } from '../CommonComponents/InfoSection'

import { managementService } from '@/services/management.service'

interface ManagementResponse {
	main_image: string
	updatedAt: string
	president: { text: IMultiLangText; image?: string }
	executive: { column1: IMultiLangText; column2?: IMultiLangText }
	general_assembly: { column1: IMultiLangText; column2?: IMultiLangText }
	administration: { column1: IMultiLangText; column2?: IMultiLangText }
	committee: { column1: IMultiLangText; column2?: IMultiLangText }
	censorship: { column1: IMultiLangText; column2?: IMultiLangText }
}

const pick = (obj: IMultiLangText | undefined, locale: string) => {
	if (!obj) return ''
	return obj[locale as keyof IMultiLangText] ?? obj.en ?? ''
}

const HtmlBlock: React.FC<{ html: string; isFirstOfPair?: boolean }> = ({
	html,
	isFirstOfPair
}) => (
	<div
		className={`sm:col-span-4 col-span-full flex flex-col gap-[1ch] leading-4.5 ${
			isFirstOfPair ? 'mb-12' : 'mb-20'
		} sm:mb-24 prose max-w-none [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-2`}
		dangerouslySetInnerHTML={{ __html: html }}
	/>
)

const Administration: React.FC = () => {
	const locale = useLocale()
	const t = useTranslations('index.Administration')
	const tCategories = useTranslations('BlogCategories')

	const tags = (
		[
			'PRESIDENT',
			'EXECUTIVE_BODY',
			'GENERAL_ASSEMBLY',
			'BOARD_OF_DIRECTORS',
			'SELECTION_COMMITTEE',
			'AUDIT_COMMISSION'
		] as const
	).map(k => tCategories(k))

	const locRaw = t.raw('location') as Record<string, string>
	const location: Breadcrumb[] = [
		{ text: locRaw['0'] ?? 'Home', link: '/' },
		{ text: locRaw['1'] ?? 'AboutUs', link: '/aboutUs' },
		{ text: locRaw['2'] ?? 'Administration', link: '/administration' }
	]

	const { data } = useQuery({
		queryKey: ['management'],
		queryFn: () => managementService.getManagement()
	})

	const management = data?.data as ManagementResponse | undefined

	const formatDate = (iso?: string) => {
		if (!iso) return ''
		const d = new Date(iso)
		return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1)
			.toString()
			.padStart(2, '0')}.${d.getFullYear()}`
	}

	return (
		<main className='relative w-full h-fit sm:mb-[100vh] bg-sand-50'>
			<InfoSection
				tags={tags}
				headerText={t('title')}
				location={location}
				imageSrc={management?.main_image}
				imageAlt='Management Image'
				locale={locale}
				lastActualization={formatDate(management?.updatedAt)}
				isAdminOrDocs
			/>

			<section className='w-screen h-fit flex flex-col'>
				<div className='grid grid-cols-full w-full relative'>
					<AnimatedHeader
						text={t('president.header')}
						customStyles='col-span-full sm:text-5xl text-xl leading-6 font-bold sm:leading-13'
					/>
					<AnimatedLine customStyles='col-span-full mb-2 mt-7.5 sm:mt-12' />
					<AnimatedText
						text={t('president.detailsLabel')}
						customStyles='font-bold col-span-full sm:col-span-3 sm:mb-0 mb-12'
					/>

					<HtmlBlock html={pick(management?.president?.text, locale)} />

					{management?.president?.image && (
						<div className='sm:col-start-8 sm:col-span-4 col-span-full flex justify-center items-start mb-20 sm:mb-24'>
							<Image
								src={management.president.image}
								alt='President'
								width={400}
								height={400}
								className='max-w-full h-auto aspect-square object-cover rounded-2xl shadow-md'
								priority
							/>
						</div>
					)}
				</div>

				<div className='grid grid-cols-full w-full relative'>
					<AnimatedHeader
						text={t('executiveBody.header')}
						customStyles='col-span-full sm:text-5xl text-xl font-bold sm:leading-13 leading-6'
					/>
					<AnimatedLine customStyles='col-span-full mb-2 mt-7.5 sm:mt-12' />
					<AnimatedText
						text={t('executiveBody.detailsLabel')}
						customStyles='font-bold col-span-full sm:mb-0 mb-12 sm:col-span-3'
					/>
					<HtmlBlock
						html={pick(management?.executive?.column1, locale)}
						isFirstOfPair={!!management?.executive?.column2}
					/>
					{management?.executive?.column2 && (
						<HtmlBlock html={pick(management.executive.column2, locale)} />
					)}
				</div>

				<div className='grid grid-cols-full w-full relative'>
					<AnimatedHeader
						text={t('generalAssembly.header')}
						customStyles='col-span-full text-xl sm:text-5xl font-bold sm:leading-13 leading-6'
					/>
					<AnimatedLine customStyles='col-span-full mb-2 mt-7.5 sm:mt-12' />
					<AnimatedText
						text={t('generalAssembly.subheader')}
						customStyles='font-bold col-span-full sm:mb-0 mb-12 sm:col-span-3'
					/>
					<HtmlBlock
						html={pick(management?.general_assembly?.column1, locale)}
						isFirstOfPair={!!management?.general_assembly?.column2}
					/>
					{management?.general_assembly?.column2 && (
						<HtmlBlock html={pick(management.general_assembly.column2, locale)} />
					)}
				</div>

				<div className='grid grid-cols-full w-full relative'>
					<AnimatedHeader
						text={t('boardOfDirectors.header')}
						customStyles='col-span-full text-xl sm:text-5xl font-bold sm:leading-13 leading-6'
					/>
					<AnimatedLine customStyles='col-span-full mb-2 mt-7.5 sm:mt-12' />
					<AnimatedText
						text={t('boardOfDirectors.subheader')}
						customStyles='font-bold col-span-full sm:mb-0 mb-12 sm:col-span-3'
					/>
					<HtmlBlock
						html={pick(management?.administration?.column1, locale)}
						isFirstOfPair={!!management?.administration?.column2}
					/>
					{management?.administration?.column2 && (
						<HtmlBlock html={pick(management.administration.column2, locale)} />
					)}
				</div>

				<div className='grid grid-cols-full w-full relative'>
					<AnimatedHeader
						text={t('selectionCommittee.header')}
						customStyles='col-span-full sm:text-5xl text-xl font-bold sm:leading-13 leading-6'
					/>
					<AnimatedLine customStyles='col-span-full mb-2 mt-7.5 sm:mt-12' />
					<AnimatedText
						text={t('selectionCommittee.subheader')}
						customStyles='font-bold col-span-full sm:mb-0 mb-12 sm:col-span-3'
					/>
					<HtmlBlock
						html={pick(management?.committee?.column1, locale)}
						isFirstOfPair={!!management?.committee?.column2}
					/>
					{management?.committee?.column2 && (
						<HtmlBlock html={pick(management.committee.column2, locale)} />
					)}
				</div>

				<div className='grid grid-cols-full w-full relative'>
					<AnimatedHeader
						text={t('auditCommission.header')}
						customStyles='col-span-full sm:text-5xl text-xl font-bold sm:leading-13 leading-6'
					/>
					<AnimatedLine customStyles='col-span-full mb-2 mt-7.5 sm:mt-12' />
					<AnimatedText
						text={t('auditCommission.subheader')}
						customStyles='font-bold col-span-full sm:mb-0 mb-12 sm:col-span-3'
					/>
					<HtmlBlock
						html={pick(management?.censorship?.column1, locale)}
						isFirstOfPair={!!management?.censorship?.column2}
					/>
					{management?.censorship?.column2 && (
						<HtmlBlock html={pick(management.censorship.column2, locale)} />
					)}
				</div>
			</section>
		</main>
	)
}

export default Administration
