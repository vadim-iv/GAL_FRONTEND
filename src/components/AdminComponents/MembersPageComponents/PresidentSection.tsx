'use client'

import { AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'
import { IMemberResponse, MemberRolesEnum } from '@/types/member.types'

import { MemberFormModal } from './MemberFormModal/MemberFormModal'
import { MemberRow } from './MemberRow'
import { MemberRowHeader } from './MemberRowHeader'

interface Props {
	members: IMemberResponse[]
	language: 'ro' | 'ru' | 'en'
}

export function PresidentSection({ members, language }: Props) {
	const president = members.find(m => m.roles.includes(MemberRolesEnum.PRESIDENT))

	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [isEditOpen, setIsEditOpen] = useState(false)

	return (
		<div className='mt-[6rem]'>
			<h1 className='text-[3rem] font-[700] leading-[3.25rem] text-green-700'>
				{ADMIN_MEMBERS_TRANSLATE.sectionTitles.president[language]}
			</h1>
			<div className='border-t border-gray-500 mt-[1rem] pt-[0.75rem]' />

			{president && (
				<div className='mt-[1rem]'>
					<MemberRowHeader language={language} showImage />
				</div>
			)}

			<div className='mt-[0.5rem]'>
				{president ? (
					<MemberRow
						member={president}
						language={language}
						showImage
						previewField='details'
						onEdit={() => setIsEditOpen(true)}
					/>
				) : (
					<button
						type='button'
						className='cursor-pointer hover:opacity-70 transition-opacity duration-300 w-full mt-[0.5rem] border border-dashed border-gray-500 bg-gray-400 rounded-[1rem] h-[6rem] flex items-center justify-center gap-[0.5rem]'
						onClick={() => setIsCreateOpen(true)}
					>
						<Plus className='text-green-700 size-[1.25rem]' />
						<span className='text-[1rem] leading-[1.125rem] text-green-700 font-[400]'>
							{ADMIN_MEMBERS_TRANSLATE.addButtonLabel.president[language]}
						</span>
					</button>
				)}
			</div>

			<AnimatePresence mode='wait'>
				{isCreateOpen && (
					<MemberFormModal initialRole={MemberRolesEnum.PRESIDENT} onClose={() => setIsCreateOpen(false)} />
				)}
			</AnimatePresence>

			<AnimatePresence mode='wait'>
				{isEditOpen && president && (
					<MemberFormModal member={president} onClose={() => setIsEditOpen(false)} />
				)}
			</AnimatePresence>
		</div>
	)
}
