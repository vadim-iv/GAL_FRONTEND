import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { LogIn } from './LogIn'

export const metadata: Metadata = {
	title: 'Autentificare membri',
	...NO_INDEX_PAGE
}

export default function LoginPage() {
	return <LogIn />
}
