/* eslint-disable  @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Onest } from 'next/font/google'
import { notFound } from 'next/navigation'

import SmoothScroll from '@/components/providers/SmoothScroll'

import { Providers } from './(admin)/providers'
import { routing } from '@/i18n/routing'

import './globals.css'

// Required for Next.js to resolve relative OG/Twitter image URLs (e.g.
// '/meta_image.jpg' in each page's generateMetadata()) into absolute URLs —
// without this it falls back to inferring the deploy URL, which isn't reliable
// for a custom domain.
export const metadata: Metadata = {
	metadataBase: new URL('https://www.galstejaruldacilor.md'),
	icons: {
		icon: [
			{
				rel: 'icon',
				media: '(prefers-color-scheme: light)',
				url: '/favicons/favicon-dark.svg'
			},
			{
				rel: 'icon',
				media: '(prefers-color-scheme: dark)',
				url: '/favicons/favicon-light.svg' 
			}
		]
	}
}

const onest = Onest({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	display: 'swap'
})

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }))
}

export default async function RootLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	setRequestLocale(locale)

	const messages = await getMessages()

	return (
		<html
			lang={locale}
			className='scrollbars-75'
		>
			<body className={`relative ${onest.className} bg-white`}>
				<NextIntlClientProvider messages={messages}>
					<SmoothScroll>
						<Providers>{children}</Providers>
					</SmoothScroll>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
