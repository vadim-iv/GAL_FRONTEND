import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'

import { ADMIN_PAGE_HEADERS } from '@/constants/admin-sidebar.constants'

import { ADMIN_PAGES } from '@/config/admin-pages.config'

import { usePathname } from '@/i18n/navigation'
import { blogService } from '@/services/blog.service'
import { decisionService } from '@/services/decision.service'
import { localCallService } from '@/services/local-call.service'
import { useParams } from 'next/navigation'

export function usePageTitle() {
	const pathname = usePathname()
	const locale = useLocale() as 'ro' | 'ru' | 'en'
    const params = useParams()

	let pageTitle = ''
	let pageSlug = ''

	const isEditBlogPage = pathname.includes(ADMIN_PAGES.EDIT_BLOG)
	const id = isEditBlogPage ? params.id as string : ""
	const { data: blogData, isLoading: isBlogSlugLoading } = useQuery({
		queryKey: ['blog', id],
		queryFn: () => blogService.getBlogById(id),
		enabled: isEditBlogPage && !!id
	})

	// Every local-call-nested route ([id]/projects, [id]/projects/create,
	// [id]/projects/edit/[projectId]) and the flat edit-local-call/[id] route all
	// need the parent local call's name for the breadcrumb slug.
	const isLocalCallRelated =
		pathname.includes(ADMIN_PAGES.LOCAL_CALLS) || pathname.includes(ADMIN_PAGES.EDIT_LOCAL_CALL)
	const localCallId = isLocalCallRelated ? (params.id as string) : ''
	const { data: localCallResponse, isLoading: isLocalCallSlugLoading } = useQuery({
		queryKey: ['localCall', localCallId],
		queryFn: () => localCallService.getLocalCallById(localCallId),
		enabled: isLocalCallRelated && !!localCallId
	})
	const localCallData = localCallResponse?.data

	// edit-decision/[id] needs the decision's title for the breadcrumb slug.
	const isEditDecisionPage = pathname.includes(ADMIN_PAGES.EDIT_DECISION)
	const decisionId = isEditDecisionPage ? (params.id as string) : ''
	const { data: decisionResponse, isLoading: isDecisionSlugLoading } = useQuery({
		queryKey: ['decision', decisionId],
		queryFn: () => decisionService.getDecisionById(decisionId),
		enabled: isEditDecisionPage && !!decisionId
	})
	const decisionData = decisionResponse?.data

	const isSlugLoading = isBlogSlugLoading || isLocalCallSlugLoading || isDecisionSlugLoading

	// Ordered most-specific-first: every nested project route shares the
	// /admin/local-calls prefix, so the more specific checks must run before the
	// generic local-calls-list fallback.
	if (pathname.includes(ADMIN_PAGES.LOCAL_CALLS) && pathname.includes('/projects/edit/')) {
		pageTitle = localCallData?.name[locale] || ADMIN_PAGE_HEADERS.editProjectPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.editProjectPage.title[locale]
	} else if (pathname.includes(ADMIN_PAGES.LOCAL_CALLS) && pathname.includes('/projects/create')) {
		pageTitle = localCallData?.name[locale] || ADMIN_PAGE_HEADERS.createProjectPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.createProjectPage.title[locale]
	} else if (pathname.includes(ADMIN_PAGES.LOCAL_CALLS) && pathname.includes('/projects')) {
		pageTitle = ADMIN_PAGE_HEADERS.localCallProjectsPage.title[locale]
		pageSlug = localCallData?.name[locale] || ''
	} else if (pathname.includes(ADMIN_PAGES.CREATE_LOCAL_CALL)) {
		pageTitle = ADMIN_PAGE_HEADERS.createLocalCallPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.createLocalCallPage.slug
	} else if (pathname.includes(ADMIN_PAGES.EDIT_LOCAL_CALL)) {
		pageTitle = ADMIN_PAGE_HEADERS.editLocalCallPage.title[locale]
		pageSlug = localCallData?.name[locale] || ''
	} else if (pathname.includes(ADMIN_PAGES.LOCAL_CALLS)) {
		pageTitle = ADMIN_PAGE_HEADERS.localCallsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.localCallsPage.slug
	} else if (pathname.includes(ADMIN_PAGES.NEWS)) {
		pageTitle = ADMIN_PAGE_HEADERS.newsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.newsPage.slug
	} else if (pathname.includes(ADMIN_PAGES.PROJECTS)) {
		pageTitle = ADMIN_PAGE_HEADERS.projectsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.projectsPage.slug
	} else if (pathname.includes(ADMIN_PAGES.ADMINISTRATION)) {
		pageTitle = ADMIN_PAGE_HEADERS.administrationPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.administrationPage.slug[locale]
	} else if (pathname.includes(ADMIN_PAGES.DOCUMENTS)) {
		pageTitle = ADMIN_PAGE_HEADERS.documentsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.documentsPage.slug[locale]
	} else if (pathname.includes(ADMIN_PAGES.LOCAL_PRODUCTS)) {
		pageTitle = ADMIN_PAGE_HEADERS.localProductsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.localProductsPage.slug
	} else if (pathname.includes(ADMIN_PAGES.COMMUNITY_SERVICES)) {
		pageTitle = ADMIN_PAGE_HEADERS.communityServicesPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.communityServicesPage.slug
	} else if (pathname.includes(ADMIN_PAGES.TOURIST_ATTRACTIONS)) {
		pageTitle = ADMIN_PAGE_HEADERS.touristAttractionsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.touristAttractionsPage.slug
	} else if (pathname.includes(ADMIN_PAGES.PEOPLE_AND_VALUES)) {
		pageTitle = ADMIN_PAGE_HEADERS.peopleAndValuesPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.peopleAndValuesPage.slug
	} else if (pathname.includes(ADMIN_PAGES.CREATE_BLOG)) {
		pageTitle = ADMIN_PAGE_HEADERS.createBlogPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.createBlogPage.slug
	} else if (pathname.includes(ADMIN_PAGES.EDIT_BLOG)) {
		pageTitle = ADMIN_PAGE_HEADERS.editBlogPage.title[locale]
		pageSlug = blogData?.data.title[locale] || ADMIN_PAGE_HEADERS.editBlogPage.slug
	} else if (pathname.includes(ADMIN_PAGES.STATISTICS)) {
		pageTitle = ADMIN_PAGE_HEADERS.statisticsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.statisticsPage.slug[locale]
	} else if (pathname.includes(ADMIN_PAGES.CREATE_DECISION)) {
		pageTitle = ADMIN_PAGE_HEADERS.createDecisionPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.createDecisionPage.slug
	} else if (pathname.includes(ADMIN_PAGES.EDIT_DECISION)) {
		pageTitle = ADMIN_PAGE_HEADERS.editDecisionPage.title[locale]
		pageSlug = decisionData?.title[locale] || ''
	} else if (pathname.includes(ADMIN_PAGES.DECISIONS)) {
		pageTitle = ADMIN_PAGE_HEADERS.decisionsPage.title[locale]
		pageSlug = ADMIN_PAGE_HEADERS.decisionsPage.slug
	}

	return {
		pageTitle,
		pageSlug,
        isSlugLoading
	}
}
