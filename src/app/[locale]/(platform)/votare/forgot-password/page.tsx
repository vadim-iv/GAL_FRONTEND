import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { ForgotPassword } from './ForgotPassword'

export const metadata: Metadata = {
	title: 'Recuperare parolă',
	...NO_INDEX_PAGE
}

export default function ForgotPasswordPage() {
	return <ForgotPassword />
}
