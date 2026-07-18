interface MultiLangValue {
	ro?: string
	ru?: string
	en?: string
}

// A multi-language field only counts as complete once every language has real
// content — used both for submit-time validation and for cross-language field
// rules (so e.g. a filled-in Romanian tab still shows an error state while
// Russian/English are empty, instead of only the empty tab looking invalid).
export function isMultiLangComplete(value?: MultiLangValue): boolean {
	return !!value?.ro?.trim() && !!value?.ru?.trim() && !!value?.en?.trim()
}
