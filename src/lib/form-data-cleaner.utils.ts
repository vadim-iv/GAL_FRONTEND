import { TypeBlogFormState } from '@/types/blog.types'

export const cleanBlogFormData = (data: TypeBlogFormState): TypeBlogFormState => {
	const cleaned = data

	const isMultiLangEmpty = (text: { ro?: string; ru?: string; en?: string } | undefined) => {
		if (!text) return true
		return !text.ro?.trim() && !text.ru?.trim() && !text.en?.trim()
	}

	if (cleaned.summary?.column2 && isMultiLangEmpty(cleaned.summary.column2)) {
		delete cleaned.summary.column2
	}

	if (cleaned.sections) {
		cleaned.sections = cleaned.sections.map(section => {
			const cleanedSection = { ...section }

			if (cleanedSection.subsections) {
				cleanedSection.subsections = cleanedSection.subsections.map(subsection => {
					const cleanedSubsection = { ...subsection }

					// Remove column2 if empty
					if (cleanedSubsection.column2 && isMultiLangEmpty(cleanedSubsection.column2)) {
						delete cleanedSubsection.column2
					}

					// Remove images array if empty
					if (cleanedSubsection.images && cleanedSubsection.images.length === 0) {
						delete cleanedSubsection.images
					}

					return cleanedSubsection
				})
			}

			return cleanedSection
		})
	}

	// Remove empty categories array
	if (cleaned.categories && cleaned.categories.length === 0) {
		delete cleaned.categories
	}

	return cleaned
}
