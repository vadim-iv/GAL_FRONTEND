'use client'

import { Upload, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Control, RegisterOptions, useController } from 'react-hook-form'
import { toast } from 'sonner'

import { ImageToUpload } from '@/types/blog.types'
import { TypeLocalCallFormState, TypeProjectFormState } from '@/types/local-call.types'

import { BLOG_FORM } from '@/config/blog-form.config'

import { useGenerateLocalCallImageLink } from '@/hooks/local-call/useGenerateLocalCallImageLink'

import { isImageValid } from '@/lib/file-upload.utils'
import { cn } from '@/lib/utils'

interface Props {
	name: keyof TypeLocalCallFormState | keyof TypeProjectFormState
	control: Control<TypeLocalCallFormState> | Control<TypeProjectFormState>
	rules?: RegisterOptions
	className?: string
	height?: string
	language: 'ro' | 'en' | 'ru'
	label: string
	placeholderMain: string
	placeholderSubtext: string

	addImageToUpload?: (imageUrl: ImageToUpload) => void
	addImageToDelete?: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void
}

// Mirrors src/components/AdminComponents/ui/ImageUpload/ImageUpload.tsx but hits the
// local-call module's own generate-image-upload-link endpoint (S3 'LOCAL_CALLS/' prefix)
// instead of the shared component's hardwired blogs endpoint. Shared by both LocalCall's
// own cover image and each embedded Project's cover image.
export function LocalCallImageUpload({
	name,
	height,
	language,
	control,
	rules,
	className,
	label,
	placeholderMain,
	placeholderSubtext,
	addImageToUpload,
	addImageToDelete,
	removeImageFromUpload
}: Props) {
	const t = useTranslations('Admin.ToastMessages')
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string>('')
	const [currentUploadUrl, setCurrentUploadUrl] = useState<string>('')
	const { imageData, isImageLinkPending, generateLink, isImageLinkGenerated } =
		useGenerateLocalCallImageLink()

	const {
		field: { value, onChange },
		fieldState
	} = useController({
		name: name as any,
		control: control as any,
		rules: rules as any
	})

	useEffect(() => {
		if (isImageLinkGenerated && imageData && selectedFile && value !== imageData.data.publicUrl) {
			const uploadInfo = {
				file: selectedFile,
				uploadUrl: imageData.data.uploadUrl
			}

			addImageToUpload?.(uploadInfo)
			setCurrentUploadUrl(imageData.data.uploadUrl)

			onChange(imageData.data.publicUrl)
		}
	}, [isImageLinkGenerated, imageData, selectedFile, onChange, addImageToUpload, value])

	const createPreview = (file: File) => {
		const reader = new FileReader()

		reader.onload = e => {
			if (e.target?.result) {
				setPreviewUrl(e.target.result as string)
			}
		}

		reader.onerror = () => {
			toast.error(t('failed_to_read_image'))
		}

		reader.readAsDataURL(file)
	}

	const handleFileUpload = (file: File) => {
		const isValid = isImageValid(
			file,
			BLOG_FORM.MAX_IMAGE_FILE_SIZE_IN_MB,
			BLOG_FORM.ACCEPTED_IMAGE_FORMATS,
			language
		)
		if (!isValid) {
			if (fileInputRef.current) {
				fileInputRef.current.value = ''
			}
			return
		}

		setSelectedFile(file)
		createPreview(file)
		generateLink()
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			handleFileUpload(e.target.files[0])
		}
	}

	const hasError = !!fieldState.error

	const hasImage = !!value || !!previewUrl
	const displayImageUrl = previewUrl || value

	const removeImage = () => {
		onChange('')
		setPreviewUrl('')
		setSelectedFile(null)

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}

		if (currentUploadUrl) {
			removeImageFromUpload?.(currentUploadUrl)
			setCurrentUploadUrl('')
		}

		if (value && !previewUrl) {
			addImageToDelete?.(value as string)
		}
	}

	useEffect(() => {
		return () => {
			if (previewUrl && previewUrl.startsWith('blob:')) {
				URL.revokeObjectURL(previewUrl)
			}
		}
	}, [previewUrl])

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>{label}</label>
			<div
				className={cn(
					'w-full hover:opacity-80 relative rounded-[1rem] transition-all duration-300 bg-gray-400 border border-dashed border-gray-500 overflow-hidden flex flex-col items-center justify-center',
					hasError && 'border-error',
					isImageLinkPending && 'opacity-50',
					className
				)}
				style={{ height: hasImage ? '20rem' : height || '20rem' }}
			>
				<input
					ref={fileInputRef}
					type='file'
					accept={BLOG_FORM.ACCEPTED_IMAGE_FORMATS.join(',')}
					onChange={handleInputChange}
					className={`cursor-pointer w-full h-full absolute inset-0 opacity-0 z-10 ${hasImage && 'hidden'}`}
					onError={() => {
						toast.error(t('failed_to_upload_image'))
					}}
					disabled={isImageLinkPending || hasImage}
				/>

				{isImageLinkPending ? (
					<div className='text-center'>
						<p className='text-gray-600'>
							{language === 'ro'
								? 'Se încarcă imaginea...'
								: language === 'en'
									? 'Uploading image...'
									: 'Загрузка изображения...'}
						</p>
					</div>
				) : hasImage ? (
					<div className='relative w-full h-full'>
						<Image
							src={displayImageUrl as string}
							alt='Uploaded image'
							fill
							className='w-full h-full object-cover hover:opacity-80 transition-opacity duration-300'
						/>

						<button
							type='button'
							onClick={removeImage}
							className='absolute z-20 top-[1rem] right-[1rem] cursor-pointer hover:opacity-80 transition-opacity duration-300'
						>
							<X className='size-[1.25rem] text-white drop-shadow' />
						</button>
					</div>
				) : (
					<div>
						<div className='flex items-center gap-[0.5rem]'>
							<Upload className={`size-[1.25rem] ${hasError ? 'text-error' : 'text-green-700'} `} />
							<p className={`text-[1rem] leading-[1.125rem] ${hasError ? 'text-error' : 'text-green-700'}`}>
								{placeholderMain}
							</p>
						</div>
						<p
							className={`text-[0.75rem] leading-[0.875rem] text-center mt-[0.5rem] ${hasError ? 'text-error' : 'text-green-600'}`}
						>
							{placeholderSubtext}: {BLOG_FORM.MAX_IMAGE_FILE_SIZE_IN_MB}MB
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
