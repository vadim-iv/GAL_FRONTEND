import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

import { ADMIN_PAGES } from './config/admin-pages.config'
import { PLATFORM_PAGES } from './config/platform-pages.config'
import { routing } from './i18n/routing'
import { EnumTokens } from './services/auth-token.service'
import { MemberEnumTokens } from './services/members-auth-token.service'

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing)

// Redirect targets built as bare paths (e.g. "/votare/login") lose whatever
// locale was in the original URL — next-intl then treats them as unprefixed
// and falls back to the default locale ("ro"), regardless of what the user
// had selected. Preserve it explicitly on every redirect instead.
function getRequestLocale(pathname: string): string {
	const match = pathname.match(/^\/(ro|en|ru)(?=\/|$)/)
	return match ? match[1] : routing.defaultLocale
}

export default async function middleware(request: NextRequest) {
	const { url, cookies } = request
	const locale = getRequestLocale(request.nextUrl.pathname)

	const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value

	if (url.includes('/administration') || url.includes('/administratie') || url.includes('/администрация')) {
		return intlMiddleware(request);
	}

	const isLogInPage = url.includes('/admin/login')
	const isAdminRootUrl = url.endsWith('/admin') || url.endsWith('/admin/')
	const isAdminPage = url.includes('/admin') && !url.includes('/administration')

	if (isLogInPage && accessToken) {
		return NextResponse.redirect(new URL(`/${locale}${ADMIN_PAGES.NEWS}`, url))
	}

	if (isLogInPage) {
		return intlMiddleware(request)
	}

	if (isAdminPage && !accessToken) {
		return NextResponse.redirect(new URL(`/${locale}${ADMIN_PAGES.LOGIN}`, url))
	}

	if (isAdminRootUrl && accessToken) {
		return NextResponse.redirect(new URL(`/${locale}${ADMIN_PAGES.NEWS}`, url))
	}

	const memberAccessToken = cookies.get(MemberEnumTokens.ACCESS_TOKEN)?.value

	const isMemberPublicPage =
		url.includes('/votare/login') || url.includes('/votare/forgot-password') || url.includes('/votare/reset-password')
	const isMemberLoginPage = url.includes('/votare/login')
	const isPlatformPage = url.includes('/votare') && !isMemberPublicPage

	if (isMemberLoginPage && memberAccessToken) {
		return NextResponse.redirect(new URL(`/${locale}${PLATFORM_PAGES.LOCAL_CALLS}`, url))
	}

	if (isMemberPublicPage) {
		return intlMiddleware(request)
	}

	if (isPlatformPage && !memberAccessToken) {
		return NextResponse.redirect(new URL(`/${locale}${PLATFORM_PAGES.LOGIN}`, url))
	}

	// For all other pages (non-admin, non-platform), just apply intl middleware
	const response = intlMiddleware(request)

	return response
}

export const config = {
	matcher: [
		'/', // The root path
		'/(ro|en|ru)/:path*', // Locale-prefixed paths
		'/((?!api|_next|_vercel|.*\\..*).*)'
	]
}
