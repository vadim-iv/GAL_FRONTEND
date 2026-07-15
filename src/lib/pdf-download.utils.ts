// Triggers a real file download (proper filename + .pdf extension, browser's
// native "save" flow) for a fetched PDF blob. Needed because the results-PDF
// endpoints are POST + auth-protected, so a plain <a href>/window.open(url) can't
// attach the bearer token — the blob has to be fetched client-side first, then
// handed to a synthetic anchor with a `download` attribute. Unlike window.open(),
// this doesn't open a new browsing context, so it isn't treated as a popup by
// ad-blockers/popup blockers — confirmed one was silently swallowing the
// window.open()-based version regardless of timing.
export function downloadPdfBlob(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = filename
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
