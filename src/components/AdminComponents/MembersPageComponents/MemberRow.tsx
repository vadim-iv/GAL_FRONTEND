'use client'

import { SquarePen } from 'lucide-react'
import Image from 'next/image'

import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'
import { IMemberResponse } from '@/types/member.types'

import { toInlinePreview } from '@/lib/html-preview.utils'

import { Tag } from '../ui/Tag/Tag'
import { ROLE_COLOR, ROLE_TITLE_KEY } from './MemberFormModal/MemberRolesInput'

interface Props {
	member: IMemberResponse
	language: 'ro' | 'ru' | 'en'
	showImage?: boolean
	readOnly?: boolean
	// Which field the preview column shows — the President section keeps the long
	// bio (`details`), every other section previews the short blurb (`shortDetails`).
	previewField?: 'details' | 'shortDetails'
	onEdit?: () => void
}

const CELL_CLASS = 'text-[0.875rem] font-[400] text-green-700 truncate'

export function MemberRow({
	member,
	language,
	showImage,
	readOnly,
	previewField = 'shortDetails',
	onEdit
}: Props) {
	const previewHtml = (previewField === 'details' ? member.details?.[language] : member.shortDetails[language]) ?? ''

	return (
		<div className='flex items-center gap-[2rem] border border-gray-500 bg-gray-300 rounded-[1rem] px-[1rem] py-[0.75rem] min-h-22'>
			{showImage && (
				<div className='relative size-[3.5rem] shrink-0 rounded-[0.5rem] overflow-hidden bg-gray-300'>
					{member.imageUrl && (
						<Image src={member.imageUrl} alt={member.name[language]} fill className='object-cover' />
					)}
				</div>
			)}

			<p className={`w-[14rem] shrink-0 ${CELL_CLASS}`}>{member.email}</p>
			<p className={`w-[10rem] shrink-0 ${CELL_CLASS}`}>{member.name[language]}</p>

			<div className='w-[25rem] shrink-0 flex flex-wrap gap-[0.375rem]'>
				{member.roles.map(role => (
					<Tag key={role} color={ROLE_COLOR[role]} text={ADMIN_MEMBERS_TRANSLATE.roleTagLabel[ROLE_TITLE_KEY[role]][language]} />
				))}
			</div>

			<div
				className={`flex-1 min-w-0 ${CELL_CLASS}`}
				dangerouslySetInnerHTML={{ __html: toInlinePreview(previewHtml) }}
			/>

			{!readOnly && (
				<div className='w-[6.5rem] shrink-0 flex items-center justify-end'>
					<div
						onClick={onEdit}
						className='flex items-center gap-[0.5rem] cursor-pointer hover:opacity-70 transition-opacity duration-300'
					>
						<p className='text-[0.875rem] text-gray-600'>{ADMIN_MEMBERS_TRANSLATE.modifyLabel[language]}</p>
						<SquarePen className='size-[1.25rem] text-gray-600' />
					</div>
				</div>
			)}
		</div>
	)
}
