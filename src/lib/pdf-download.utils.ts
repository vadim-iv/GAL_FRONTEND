// Opens a fetched PDF blob in a new tab, still downloadable with a proper
// filename/extension from the browser's own PDF viewer. Needed because the
// results-PDF endpoints are POST + auth-protected, so a plain
// <a href>/window.open(url) can't attach the bearer token — the blob has to be
// fetched client-side first.
//
// A plain Blob has no name, so a blob: URL created from one gives the native
// viewer's download button nothing to call the file but a UUID with no
// extension. Wrapping it in a File (which does carry a `name`) before creating
// the object URL fixes that in Chromium/Firefox-based viewers.
export function openPdfBlobInNewTab(blob: Blob, filename: string) {
	const file = new File([blob], filename, { type: 'application/pdf' })
	const url = URL.createObjectURL(file)
	window.open(url, '_blank')
	setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
