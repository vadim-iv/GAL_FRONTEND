'use client'

import { ErrorMessage } from '@hookform/error-message'
import { Control, FormState } from 'react-hook-form'

import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'
import { ImageToUpload } from '@/types/blog.types'
import { TypeMemberFormState } from '@/types/member.types'

import { MemberImageUpload } from '../MemberImageUpload'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeMemberFormState>
	formState: FormState<TypeMemberFormState>
	addImageToUpload: (image: ImageToUpload) => void
	addImageToDelete: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void
}

export function MemberImageInput({
	language,
	control,
	formState,
	addImageToUpload,
	addImageToDelete,
	removeImageFromUpload
}: Props) {
	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_MEMBERS_TRANSLATE.imageInput[language].label}
			</label>
			<MemberImageUpload
				control={control}
				name='imageUrl'
				rules={{ required: true }}
				language={language}
				addImageToUpload={addImageToUpload}
				addImageToDelete={addImageToDelete}
				removeImageFromUpload={removeImageFromUpload}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='imageUrl'
				render={() => (
					<p className='text-error text-sm'>{ADMIN_MEMBERS_TRANSLATE.imageInput[language].error}</p>
				)}
			/>
		</div>
	)
}
