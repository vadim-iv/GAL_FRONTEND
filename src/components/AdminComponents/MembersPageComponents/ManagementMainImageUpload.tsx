import { Control } from 'react-hook-form'

import { ImageToUpload } from '@/types/blog.types'

import { ImageUpload } from '../ui/ImageUpload/ImageUpload'
import { TypeMainImageFormState } from '@/types/management.types'

interface IManagementMainImageProps {
    language: 'ro' | 'ru' | 'en'
    control: Control<TypeMainImageFormState>
    addImageToUpload: (image: ImageToUpload) => void
    addImageToDelete: (imageUrl: string) => void
    removeImageFromUpload: (uploadUrl: string) => void
}

export function ManagementMainImageUpload({
    language,
    control,
    addImageToUpload,
    addImageToDelete,
    removeImageFromUpload
}: IManagementMainImageProps) {
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
