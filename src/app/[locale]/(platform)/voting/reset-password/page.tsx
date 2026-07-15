import type { Metadata } from 'next'
import { Suspense } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { ResetPassword } from './ResetPassword'

export const metadata: Metadata = {
	title: 'Resetare parolă',
	...NO_INDEX_PAGE
}

export default function ResetPasswordPage() {
	return (
		<Suspense>
			<ResetPassword />
		</Suspense>
	)
}
