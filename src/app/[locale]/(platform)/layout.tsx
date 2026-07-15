import { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
	title: {
		default: 'Votare',
		template: '%s | Votare'
	}
}

export default function PlatformLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			{children}
			<Toaster position='top-right' duration={1500} />
		</>
	)
}
