'use client'

import { Control, FormState } from 'react-hook-form'

import { ADMIN_PROJECTS_TRANSLATE } from '@/constants/admin-projects-translate.data'
import { ImageToUpload } from '@/types/blog.types'
import { TypeProjectFormState } from '@/types/local-call.types'

import { LocalCallImageUpload } from '../../LocalCallsPageComponents/LocalCallImageUpload'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeProjectFormState>
	formState: FormState<TypeProjectFormState>
	addImageToUpload: (image: ImageToUpload) => void
	addImageToDelete: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void
}

export function ProjectImageInput({
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
			label={ADMIN_PROJECTS_TRANSLATE.imageInput[language].label}
			placeholderMain={ADMIN_PROJECTS_TRANSLATE.imageInput[language].placeholder.main}
			placeholderSubtext={ADMIN_PROJECTS_TRANSLATE.imageInput[language].placeholder.subtext}
			addImageToUpload={addImageToUpload}
			addImageToDelete={addImageToDelete}
			removeImageFromUpload={removeImageFromUpload}
		/>
	)
}
