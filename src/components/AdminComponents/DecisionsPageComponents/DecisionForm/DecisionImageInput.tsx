'use client'

import { Control, FormState } from 'react-hook-form'

import { ADMIN_DECISIONS_TRANSLATE } from '@/constants/admin-decisions-translate.data'
import { ImageToUpload } from '@/types/blog.types'
import { TypeDecisionFormState } from '@/types/decision.types'

import { DecisionImageUpload } from '../DecisionImageUpload'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeDecisionFormState>
	formState: FormState<TypeDecisionFormState>
	addImageToUpload: (image: ImageToUpload) => void
	addImageToDelete: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void
}

export function DecisionImageInput({
	language,
	control,
	addImageToUpload,
	addImageToDelete,
	removeImageFromUpload
}: Props) {
	return (
		<DecisionImageUpload
			control={control}
			name='imageUrl'
			language={language}
			label={ADMIN_DECISIONS_TRANSLATE.imageInput[language].label}
			placeholderMain={ADMIN_DECISIONS_TRANSLATE.imageInput[language].placeholder.main}
			placeholderSubtext={ADMIN_DECISIONS_TRANSLATE.imageInput[language].placeholder.subtext}
			addImageToUpload={addImageToUpload}
			addImageToDelete={addImageToDelete}
			removeImageFromUpload={removeImageFromUpload}
		/>
	)
}
