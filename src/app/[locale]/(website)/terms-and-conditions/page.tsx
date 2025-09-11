import { getTranslations, setRequestLocale } from 'next-intl/server'

import AnimatedHeader from '@/components/CommonComponents/AnimatedHeader'
import AnimatedLine from '@/components/CommonComponents/AnimatedLine'
import AnimatedText from '@/components/CommonComponents/AnimatedText'

export async function generateMetadata() {
	const t = await getTranslations('index.meta.termsAndConditions')

	return {
		title: t('title'),
		description: t('description'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			images: [{ url: '/meta_image.jpg' }]
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: ['/meta_image.jpg']
		}
	}
}

export default async function termsAndConditions({
	params
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	setRequestLocale(locale)

	const t = await getTranslations('index.termsAndConditions')
	return (
		<>
			<main className='relative mb-12 sm:mb-[100vh] bg-sand-50'>
				<section className='min-h-screen w-full grid grid-cols-full'>
					<div className='sm:mt-48 mt-24 sm:mb-46.5 mb-24 col-span-full'>
						<AnimatedHeader
							text={t('header')}
							customStyles='sm:leading-13 leading-6 sm:text-5xl text-xl font-bold my-4'
						/>
						<AnimatedText
							text={t('publication_date')}
							customStyles='leading-4.5 sm:mb-6 font-bold sm:text-base text-xs'
						/>
					</div>
					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('general_info')}
						customStyles='leading-4.5 sm:mb-12 mb-8  font-bold sm:text-base text-xs sm:col-span-3 col-span-full'
					/>
					<AnimatedText
						text={t('general_info_text1')}
						customStyles='leading-4.5 sm:mb-12 mb-8  sm:text-base text-xs sm:col-span-4 sm:col-start-4 col-span-full'
					/>
					<AnimatedText
						text={t('general_info_text2')}
						customStyles='leading-4.5 sm:mb-12 mb-8  sm:text-base text-xs sm:col-span-4 sm:col-start-8 col-span-full'
					/>
					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('website_reason')}
						customStyles='leading-4.5 sm:mb-12 mb-8  font-bold sm:text-base text-xs sm:col-span-3 col-span-full'
					/>
					<AnimatedText
						text={t('website_reason_text')}
						customStyles='leading-4.5 sm:mb-12 mb-8  sm:text-base text-xs sm:col-span-4 sm:col-start-4 col-span-full'
					/>
					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('what_we_colect')}
						customStyles='leading-4.5 sm:mb-12 mb-8  font-bold sm:text-base text-xs sm:col-span-3 col-span-full'
					/>
					<AnimatedText
						text={t('what_we_colect_text')}
						customStyles='leading-4.5 sm:mb-12 mb-8  sm:text-base text-xs sm:col-span-4 sm:col-start-4 col-span-full'
					/>

					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('reason_to_collect')}
						customStyles='leading-4.5 sm:mb-12 mb-8  font-bold sm:text-base text-xs sm:col-span-3 col-span-full'
					/>
					<AnimatedText
						text={t('reason_to_collect_text')}
						customStyles='leading-4.5 sm:mb-12 mb-8  sm:text-base text-xs sm:col-span-4 sm:col-start-4 col-span-full'
					/>

					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('data_protection')}
						customStyles='leading-4.5 sm:mb-12 mb-8  font-bold sm:text-base text-xs sm:col-span-3 col-span-full'
					/>
					<AnimatedText
						text={t('data_protection_text1')}
						customStyles='leading-4.5 sm:mb-12 mb-8  sm:text-base text-xs sm:col-span-4 sm:col-start-4 col-span-full'
					/>
					<AnimatedText
						text={t('data_protection_text2')}
						customStyles='leading-4.5 sm:mb-12 mb-8  sm:text-base text-xs sm:col-span-4 sm:col-start-8 col-span-full'
					/>

					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('user_responsability')}
						customStyles='leading-4.5 sm:mb-12 font-bold sm:text-base text-xs sm:col-span-3 col-span-full'
					/>
					<AnimatedText
						text={t('user_responsability_text')}
						customStyles='leading-4.5 sm:mb-12 mb-8  sm:text-base text-xs sm:col-span-4 sm:col-start-4 col-span-full'
					/>

					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('responsability_limit')}
						customStyles='leading-4.5 sm:mb-12 font-bold sm:text-base text-xs sm:col-span-3 col-span-full'
					/>
					<AnimatedText
						text={t('responsability_limit_text')}
						customStyles='leading-4.5 sm:mb-12 mb-8  sm:text-base text-xs sm:col-span-4 sm:col-start-4 col-span-full'
					/>
					<AnimatedText
						text={t('responsability_limit_text_2')}
						customStyles='leading-4.5 sm:mb-12 mb-8  sm:text-base text-xs sm:col-span-4 sm:col-start-8 col-span-full'
					/>

					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('modify')}
						customStyles='leading-4.5 sm:mb-12 font-bold sm:text-base text-xs sm:col-span-3 col-span-full'
					/>
					<AnimatedText
						text={t('modify_text')}
						customStyles='leading-4.5 sm:mb-12 mb-8  sm:text-base text-xs sm:col-span-4 sm:col-start-4 col-span-full'
					/>

					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('legislation')}
						customStyles='leading-4.5 sm:mb-6 font-bold sm:text-base text-xs sm:col-span-3 col-span-full'
					/>
					<AnimatedText
						text={t('legislation_text')}
						customStyles='leading-4.5 sm:mb-24 sm:text-base text-xs sm:col-span-4 sm:col-start-4 col-span-full'
					/>
				</section>
			</main>
		</>
	)
}
