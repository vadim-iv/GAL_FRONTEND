'use client'

import { AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { LangBtn } from '../BlogPageComponents/LangBtn'
import { Button } from '../ui/Button'
import { ConfirmDeleteModal } from '../ui/ConfirmDeleteModal/ConfirmDeleteModal'

import { useRouter } from '@/i18n/navigation'

interface Props {
	language: 'ro' | 'ru' | 'en'
	setLanguage: (lang: 'ro' | 'ru' | 'en') => void
	isPending: boolean
	onDeleteLocalCall?: () => void
	isCreate?: boolean
}

export function LocalCallPageNav({ language, setLanguage, isPending, onDeleteLocalCall, isCreate }: Props) {
	const t = useTranslations('Admin')
	const router = useRouter()
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleDelete = () => {
		if (isPending) return
		onDeleteLocalCall?.()
	}

	return (
		<div className='flex items-center bg-white sticky top-0 left-0 z-[90] justify-between py-[1.5rem]'>
			<div className='absolute h-[1px] w-full bg-gray-500 bottom-0 left-1/2 -translate-x-1/2' />
			<div className='flex items-center'>
				<LangBtn type='button' text='Română' isActive={language === 'ro'} onClick={() => setLanguage('ro')} />
				<LangBtn type='button' text='English' isActive={language === 'en'} onClick={() => setLanguage('en')} />
				<LangBtn type='button' text='Русский' isActive={language === 'ru'} onClick={() => setLanguage('ru')} />
			</div>
			<div className='flex items-center gap-[2.5rem]'>
				<p
					onClick={() => {
						if (isCreate) router.back()
						else setIsModalOpen(true)
					}}
					className='text-error text-[1rem] leading-[1.125rem] font-[400] cursor-pointer hover:opacity-70 transition-opacity duration-300'
				>
					{isCreate ? t('cancel') : t('delete_local_call')}
				</p>
				<AnimatePresence mode='wait'>
					{isModalOpen && (
						<ConfirmDeleteModal
							message={t('delete_local_call_question')}
							handleDelete={handleDelete}
							setDeleteModalOpen={setIsModalOpen}
						/>
					)}
				</AnimatePresence>
				<Button disabled={isPending} type='submit' className='w-fit px-[1rem] h-[2.5rem]'>
					<span className='text-[1rem] leading-[1.125rem] font-[500]'>{t('save')}</span>
				</Button>
			</div>
		</div>
	)
}
