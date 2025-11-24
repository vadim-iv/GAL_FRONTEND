import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

import AnimatedHeader from '../CommonComponents/AnimatedHeader'
import AnimatedText from '../CommonComponents/AnimatedText'

import ScrollToBottom from './ScrollToBottom'

const Donation = () => {
	const tDonation = useTranslations('index.Donation')
	return (
		<section className='w-screen h-fit grid grid-cols-donation relative px-8 mt-24 pb-24'>
			<div className='order-2 sm:order-1 col-span-full sm:col-span-11 sm:grid sm:grid-cols-11 text-sand-50 bg-forest-800 sm:p-8 p-6 sm:rounded-l-2xl sm:rounded-br-none rounded-b-2xl'>
				<AnimatedHeader
					customStyles='sm:col-span-9 text-2xl sm:text-5xl h-fit font-bold mb-8 sm:mb-0 sm:leading-13 leading-7'
					text={tDonation('cta_title')}
				/>
				<AnimatedText
					customStyles='sm:col-span-10 row-start-2 leading-4.5 mt-6'
					text={tDonation('donation_text1')}
				/>
				<br />
				<AnimatedText
					customStyles='sm:col-span-10 row-start-3 leading-4.5 sm:mt-5'
					text={tDonation('donation_text2')}
				/>
				<div className='sm:col-span-10 row-start-4 mt-20 sm:mt-32'>
					<ScrollToBottom />
				</div>
			</div>
			<div className='order-1 sm:order-2 col-span-full sm:col-span-13 sm:h-auto h-48 bg-black relative sm:rounded-r-2xl sm:rounded-tl-none rounded-t-2xl overflow-hidden'>
				<Image
					src='/donation_image.png'
					alt='Donation Image'
					className='object-cover'
					quality={100}
					fill={true}
					unoptimized
				/>
			</div>
		</section>
	)
}

export default Donation
