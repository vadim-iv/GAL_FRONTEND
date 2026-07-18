'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

// Shown in place of the card image for Decisions/Local Calls/Projects when
// imageUrl is empty (the field is optional) — a soft green-tinted panel with
// the GAL mark and a caption, so a missing image reads as an intentional
// branded state rather than a broken/loading box.
export function ImageFallback() {
	const t = useTranslations('Platform')

	return (
		<div className='w-full h-full flex flex-col items-center justify-center gap-[0.5rem] bg-green-300/10'>
			<Image src='/admin_assets/logo-gal-green.svg' alt='' width={40} height={40} />
			<p className='text-[0.875rem] text-green-700'>{t('noImageAvailable')}</p>
		</div>
	)
}
