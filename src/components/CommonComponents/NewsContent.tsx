import React from 'react'

import { ISection, ISummary } from '@/types/blog.types'
import { IMultiLangText } from '@/types/shared/text.types'

import AnimatedHeader from './AnimatedHeader'
import AnimatedLine from './AnimatedLine'
import AnimatedText from './AnimatedText'
import ParalaxImage from './ParalaxImage'

export type Locale = 'ro' | 'ru' | 'en'

export interface NewsContentProps {
	summary: ISummary
	sections: ISection[]
	locale: Locale
}

const t = (value: IMultiLangText | undefined, locale: Locale): string => {
	if (!value) return ''
	return value[locale] ?? ''
}

const NewsContent: React.FC<NewsContentProps> = ({ summary, sections, locale }) => {
	const summaryColumns = [summary.column1, summary.column2].filter(Boolean) as IMultiLangText[]

	return (
		<section className='w-screen h-fit grid grid-cols-full relative text-forest-900'>
			<AnimatedLine customStyles='col-span-full mb-2' />
			<AnimatedText
				text={t({ ro: 'Sumarul proiectului', ru: 'Сводка проекта', en: 'Project summary' }, locale)}
				customStyles='sm:col-span-2 col-span-full font-bold leading-4.5 sm:mb-0 mb-12'
			/>

			{summaryColumns.map((c, idx) => (
				<AnimatedText
					key={`summary-${idx}`}
					text={t(c, locale)}
					customStyles={`sm:col-span-4 col-span-full sm:col-start-${4 + idx * 4} leading-4.5`}
				/>
			))}

			{sections.map((section, sIdx) => (
				<React.Fragment key={`section-${sIdx}`}>
					<AnimatedHeader
						text={t(section.title, locale)}
						customStyles='
              sm:col-span-9 col-span-full
              sm:text-5xl sm:leading-13 text-xl leading-6 font-bold
              mt-20 sm:mt-24
              [.spacer+&]:mt-0        
              sm:[.spacer+&]:mt-24      
            '
					/>

					{section.subsections.map((sub, subIdx) => (
						<React.Fragment key={`sub-${sIdx}-${subIdx}`}>
							<AnimatedLine customStyles='col-span-full mb-2 mt-6 sm:mt-12' />

							<AnimatedText
								text={t(sub.title, locale)}
								customStyles='col-span-full sm:col-span-2 font-bold leading-4.5 sm:mb-0 mb-12'
							/>
							<AnimatedText
								text={t(sub.column1, locale)}
								customStyles='col-span-full sm:col-span-4 mb-0 mb-12 sm:col-start-4 leading-4.5'
							/>
							<AnimatedText
								text={t(sub.column2, locale)}
								customStyles='col-span-full sm:col-span-4 sm:col-start-8 leading-4.5'
							/>

							{sub.images && sub.images.length > 0 && (
								<div
									className='
                    col-span-full mt-20 sm:mt-24 mb-20 sm:mb-16 space-y-10 sm:space-y-24
                    [&:has(+.spacer)]:mb-0 sm:[&:has(+.spacer)]:mb-0
                  '
								>
									{sub.images.map((src, imgIdx) => (
										<div
											key={`img-${sIdx}-${subIdx}-${imgIdx}`}
											className={
												src.url_2
													? 'w-full'
													: 'sm:max-w-[1448px] w-full aspect-[3/2] sm:h-[64vh] overflow-hidden rounded-2xl'
											}
										>
											{src.url_2 ? (
												<div className='flex flex-col space-y-10 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-x-6'>
													{[src.url_1, src.url_2].map((url, index) => (
														<div
															key={url}
															className='aspect-square overflow-hidden rounded-2xl col-span-6'
														>
															<ParalaxImage
																altText={`${t(sub.title, locale)} image ${imgIdx + 1}${index === 0 ? 'a' : 'b'}`}
																source={url}
															/>
														</div>
													))}
												</div>
											) : (
												<ParalaxImage
													altText={`${t(sub.title, locale)} image ${imgIdx + 1}`}
													source={src.url_1}
												/>
											)}
										</div>
									))}
								</div>
							)}

							<div className='h-20 w-full sm:hidden spacer' />
						</React.Fragment>
					))}
				</React.Fragment>
			))}
		</section>
	)
}

export default NewsContent
