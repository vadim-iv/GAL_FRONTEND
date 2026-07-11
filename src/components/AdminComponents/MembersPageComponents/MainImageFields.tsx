'use client'

import { ErrorMessage } from '@hookform/error-message'
import { Control, FormState } from 'react-hook-form'

import { ADMIN_MANAGEMENT_TRANSLATE } from '@/constants/admin-management-translate.data'
import { ImageToUpload } from '@/types/blog.types'
import { TypeMainImageFormState } from '@/types/management.types'

import { ManagementMainImageUpload } from './ManagementMainImageUpload'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeMainImageFormState>
	formState: FormState<TypeMainImageFormState>
	addImageToUpload: (image: ImageToUpload) => void
	addImageToDelete: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void
}

export function MainImageFields({
	language,
	control,
	formState,
	addImageToUpload,
	addImageToDelete,
	removeImageFromUpload
}: Props) {
	return (
		<>
			<h1 className='text-[3rem] font-[700] leading-[3.25rem] text-green-700 mt-[1rem]'>
				{ADMIN_MANAGEMENT_TRANSLATE.pageTitle[language]}
			</h1>

			<ManagementMainImageUpload
				language={language}
				control={control}
				addImageToUpload={addImageToUpload}
				addImageToDelete={addImageToDelete}
				removeImageFromUpload={removeImageFromUpload}
			/>

			<ErrorMessage
				errors={formState.errors}
				name='main_image'
				render={() => (
					<p className='mt-2 text-error'>{ADMIN_MANAGEMENT_TRANSLATE.mainImageInput[language].error}</p>
				)}
			/>
		</>
	)
}
