'use client'

import { Control, FormState } from 'react-hook-form'

import { ADMIN_LOCAL_CALLS_TRANSLATE } from '@/constants/admin-local-calls-translate.data'
import { ImageToUpload } from '@/types/blog.types'
import { TypeLocalCallFormState } from '@/types/local-call.types'

import { LocalCallImageUpload } from '../LocalCallImageUpload'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeLocalCallFormState>
	formState: FormState<TypeLocalCallFormState>
	addImageToUpload: (image: ImageToUpload) => void
	addImageToDelete: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void
}

export function LocalCallImageInput({
	language,
	control,
	addImageToUpload,
	addImageToDelete,
	removeImageFromUpload
}: Props) {
	return (
		<LocalCallImageUpload
			control={control}
			name='imageUrl'
			language={language}
			label={ADMIN_LOCAL_CALLS_TRANSLATE.imageInput[language].label}
			placeholderMain={ADMIN_LOCAL_CALLS_TRANSLATE.imageInput[language].placeholder.main}
			placeholderSubtext={ADMIN_LOCAL_CALLS_TRANSLATE.imageInput[language].placeholder.subtext}
			addImageToUpload={addImageToUpload}
			addImageToDelete={addImageToDelete}
			removeImageFromUpload={removeImageFromUpload}
		/>
	)
}
