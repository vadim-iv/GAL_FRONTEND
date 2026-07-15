'use client'

import { Trash2, Upload } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRef, useState, useEffect } from 'react'
import { Control, RegisterOptions, useController } from 'react-hook-form'
import { toast } from 'sonner'

import { TypeProjectFormState } from '@/types/local-call.types'

import { useGenerateLocalCallUploadLink } from '@/hooks/local-call/useGenerateLocalCallUploadLink'

import { isImageValid } from '@/lib/file-upload.utils'
import { cn } from '@/lib/utils'

const MAX_PDF_FILE_SIZE_IN_MB = 10
const ACCEPTED_PDF_FORMATS = ['application/pdf']

interface Props {
	name: keyof TypeProjectFormState
	control: Control<TypeProjectFormState>
	rules?: RegisterOptions
	className?: string
	language: 'ro' | 'en' | 'ru'
	label: string
	placeholderMain: string
	placeholderSubtext: string

	addFileToUpload?: (file: { file: File; uploadUrl: string }) => void
	addFileToDelete?: (fileUrl: string) => void
	removeFileFromUpload: (uploadUrl: string) => void
}

// Mirrors src/components/AdminComponents/ui/FileUpload/FileUpload.tsx but hits the
// local-call module's own generate-upload-link endpoint (S3 'PROJECTS/' prefix, PDF)
// instead of the documents module's endpoint.
export function ProjectPdfUpload({
	name,
	language,
	control,
	rules,
	className,
	label,
	placeholderMain,
	placeholderSubtext,
	addFileToUpload,
	addFileToDelete,
	removeFileFromUpload
}: Props) {
	const t = useTranslations('Admin.ToastMessages')
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [currentUploadUrl, setCurrentUploadUrl] = useState<string>('')
	const { fileData, isFileLinkPending, generateLink, isFileLinkGenerated } = useGenerateLocalCallUploadLink()

	const {
		field: { value, onChange },
		fieldState
	} = useController({
		name: name as any,
		control: control as any,
		rules: rules as any
	})

	useEffect(() => {
		if (isFileLinkGenerated && fileData && selectedFile && value !== fileData.data.publicUrl) {
			addFileToUpload?.({ file: selectedFile, uploadUrl: fileData.data.uploadUrl })
			setCurrentUploadUrl(fileData.data.uploadUrl)
			onChange(fileData.data.publicUrl)
		}
	}, [isFileLinkGenerated, fileData, selectedFile, onChange, addFileToUpload, value])

	const handleFileUpload = (file: File) => {
		const isValid = isImageValid(file, MAX_PDF_FILE_SIZE_IN_MB, ACCEPTED_PDF_FORMATS, language)
		if (!isValid) return

		setSelectedFile(file)
		generateLink()
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			handleFileUpload(e.target.files[0])
		}
	}

	const hasError = !!fieldState.error
	const hasFile = !!value

	const removeFile = () => {
		onChange('')
		setSelectedFile(null)

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}

		if (currentUploadUrl) {
			removeFileFromUpload?.(currentUploadUrl)
			setCurrentUploadUrl('')
		}

		if (value) {
			addFileToDelete?.(value as string)
		}
	}

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>{label}</label>
			<div
				className={cn(
					'w-full hover:opacity-80 relative rounded-[1rem] transition-all duration-300 bg-gray-400 border border-dashed border-gray-500 overflow-hidden flex flex-col items-center justify-center h-[6rem]',
					hasError && 'border-error',
					isFileLinkPending && 'opacity-50',
					className
				)}
			>
				<input
					ref={fileInputRef}
					type='file'
					accept={ACCEPTED_PDF_FORMATS.join(',')}
					onChange={handleInputChange}
					className={`${hasFile ? 'hidden' : ''} cursor-pointer w-full h-full absolute inset-0 opacity-0 z-10`}
					onError={() => {
						toast.error(t('file_input_error'))
					}}
					disabled={isFileLinkPending || hasFile}
				/>

				{isFileLinkPending ? (
					<div className='text-center'>
						<p className='text-gray-600'>
							{language === 'ro'
								? 'Se încarcă documentul...'
								: language === 'en'
									? 'Uploading document...'
									: 'Загрузка документа...'}
						</p>
					</div>
				) : hasFile ? (
					<div className='relative w-full h-full pl-[1.5rem] pr-[3.5rem] flex items-center'>
						{selectedFile ? (
							<p className='text-[1rem] text-ellipsis line-clamp-1 leading-[1.125rem] font-[400] text-green-700'>
								{selectedFile.name}
							</p>
						) : (
							<a
								href={value as string}
								target='_blank'
								rel='noopener noreferrer'
								className='text-[1rem] text-ellipsis line-clamp-1 leading-[1.125rem] font-[400] text-green-700'
							>
								{value as string}
							</a>
						)}

						<Trash2
							onClick={removeFile}
							className='text-black hover:text-error transition-[colors_opacity] duration-300 absolute z-20 top-1/2 -translate-y-1/2 right-[1.5rem] size-[1.5rem] cursor-pointer hover:opacity-80'
						/>
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
							{placeholderSubtext}: {MAX_PDF_FILE_SIZE_IN_MB}MB
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
