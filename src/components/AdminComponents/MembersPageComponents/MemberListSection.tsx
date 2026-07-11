'use client'

import { AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { IMemberResponse, MemberRolesEnum } from '@/types/member.types'

import { MemberFormModal } from './MemberFormModal/MemberFormModal'
import { MemberRow } from './MemberRow'
import { MemberRowHeader } from './MemberRowHeader'

interface Props {
	role: MemberRolesEnum
	title: string
	addLabel: string
	members: IMemberResponse[]
	language: 'ro' | 'ru' | 'en'
}

export function MemberListSection({ role, title, addLabel, members, language }: Props) {
	const roleMembers = members.filter(m => m.roles.includes(role))

	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [editingMember, setEditingMember] = useState<IMemberResponse | null>(null)

	return (
		<div className='mt-[6rem]'>
			<h1 className='text-[3rem] font-[700] leading-[3.25rem] text-green-700'>{title}</h1>
			<div className='border-t border-gray-500 mt-[1rem] pt-[0.75rem]' />

			{roleMembers.length > 0 && (
				<div className='mt-[1rem]'>
					<MemberRowHeader language={language} />
				</div>
			)}

			<div className='mt-[0.5rem] flex flex-col gap-[1rem]'>
				{roleMembers.map(member => (
					<MemberRow
						key={member._id}
						member={member}
						language={language}
						onEdit={() => setEditingMember(member)}
					/>
				))}
			</div>

			<button
				type='button'
				className='cursor-pointer hover:opacity-70 transition-opacity duration-300 w-full mt-[0.5rem] border border-dashed border-gray-500 bg-gray-400 rounded-[1rem] h-[6rem] flex items-center justify-center gap-[0.5rem]'
				onClick={() => setIsCreateOpen(true)}
			>
				<Plus className='text-green-700 size-[1.25rem]' />
				<span className='text-[1rem] leading-[1.125rem] text-green-700 font-[400]'>{addLabel}</span>
			</button>

			<AnimatePresence mode='wait'>
				{isCreateOpen && <MemberFormModal initialRole={role} onClose={() => setIsCreateOpen(false)} />}
			</AnimatePresence>

			<AnimatePresence mode='wait'>
				{editingMember && (
					<MemberFormModal member={editingMember} onClose={() => setEditingMember(null)} />
				)}
			</AnimatePresence>
		</div>
	)
}
