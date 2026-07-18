// Collapses block-level markup (paragraphs, lists) from rich-text HTML into a
// single flowing line for compact row previews, while keeping inline formatting
// (bold, italic, underline) intact. List items become comma-separated instead of
// bulleted; paragraph breaks become spaces.
export function toInlinePreview(html: string): string {
	return html
		.replace(/<\/li>\s*<li[^>]*>/gi, '</li>, <li>')
		.replace(/<\/(ul|ol)>\s*<(ul|ol)[^>]*>/gi, '</$1>, <$2>')
		.replace(/<\/?(ul|ol)[^>]*>/gi, '')
		.replace(/<li[^>]*>/gi, '')
		.replace(/<\/li>/gi, '')
		.replace(/<p[^>]*>/gi, ' ')
		.replace(/<\/p>/gi, '')
		.replace(/<br[^>]*>/gi, ' ')
		.trim()
		.replace(/,\s*$/, '')
}
