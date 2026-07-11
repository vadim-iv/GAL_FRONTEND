import { Control } from 'react-hook-form'

import { ImageToUpload } from '@/types/blog.types'

import { ImageUpload } from '../ui/ImageUpload/ImageUpload'
import { TypeDocumentsFormState } from '@/types/documents.types'

interface IDocumentsMainImageProps {
    language: 'ro' | 'ru' | 'en'
    control: Control<TypeDocumentsFormState>
    addImageToUpload: (image: ImageToUpload) => void
    addImageToDelete: (imageUrl: string) => void
    removeImageFromUpload: (uploadUrl: string) => void
}

export function DocumentsMainImageUpload({
    language,
    control,
    addImageToUpload,
    addImageToDelete,
    removeImageFromUpload
}: IDocumentsMainImageProps) {
    return (
        <>
            <ImageUpload
                language={language}
                name='main_image'
                control={control}
                className='mt-[6rem]'
                addImageToUpload={addImageToUpload}
                addImageToDelete={addImageToDelete}
                removeImageFromUpload={removeImageFromUpload}
                rules={{
                    required: true
                }}
            />
        </>
    )
}
