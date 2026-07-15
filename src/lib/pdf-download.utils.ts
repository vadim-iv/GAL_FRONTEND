// The results-PDF endpoints are POST + auth-protected, so the PDF has to be
// fetched client-side (bearer token attached) before it can be shown — a plain
// <a href>/window.open(url) pointed at the API can't do that. But window.open()
// is only exempt from popup blocking when it runs synchronously inside the
// click handler; calling it after the fetch resolves (an async gap) gets
// silently blocked by the browser with no error. The fix is to open a blank tab
// synchronously at click time (openBlankTab) and redirect that already-open tab
// once the blob arrives (redirectTabToPdfBlob) — redirecting an existing tab
// isn't subject to the same popup-blocking check.

// Call this directly inside the click handler, before starting the request.
export function openBlankTab(): Window | null {
	return window.open('', '_blank')
}

// A plain Blob has no name, so a blob: URL created from one gives the native
// viewer's download button nothing to call the file but a UUID with no
// extension. Wrapping it in a File (which does carry a `name`) before creating
// the object URL fixes that in Chromium/Firefox-based viewers.
export function redirectTabToPdfBlob(tab: Window | null, blob: Blob, filename: string) {
	if (!tab) return

	const file = new File([blob], filename, { type: 'application/pdf' })
	const url = URL.createObjectURL(file)
	tab.location.href = url
	setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
