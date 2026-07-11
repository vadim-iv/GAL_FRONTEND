'use client'

import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'
import { IMemberResponse } from '@/types/member.types'

import { MemberRow } from './MemberRow'
import { MemberRowHeader } from './MemberRowHeader'

interface Props {
	members: IMemberResponse[]
	language: 'ro' | 'ru' | 'en'
}

export function GeneralAssemblySection({ members, language }: Props) {
	const sortedMembers = [...members].sort((a, b) => a.name[language].localeCompare(b.name[language]))

	return (
		<div className='mt-[6rem]'>
			<h1 className='text-[3rem] font-[700] leading-[3.25rem] text-green-700'>
				{ADMIN_MEMBERS_TRANSLATE.sectionTitles.generalAssembly[language]}
			</h1>
			<div className='border-t border-gray-500 mt-[1rem] pt-[0.75rem]' />

			{sortedMembers.length > 0 && (
				<div className='mt-[1rem]'>
					<MemberRowHeader language={language} readOnly />
				</div>
			)}

			<div className='mt-[0.5rem] flex flex-col gap-[1rem]'>
				{sortedMembers.map(member => (
					<MemberRow key={member._id} member={member} language={language} readOnly />
				))}
			</div>
		</div>
	)
}
