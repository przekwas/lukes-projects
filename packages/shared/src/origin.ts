export function parseOriginList(csv?: string): Set<string> {
	return new Set(
		(csv ?? '')
			.split(',')
			.map(s => s.trim().toLowerCase())
			.filter(Boolean)
	);
}

export function isAllowedOrigin(url: string | undefined, allow: Set<string>): boolean {
	// dev-permissive if not configured
	if (!allow.size || !url) return true;
	try {
		const u = new URL(url);
		const origin = `${u.protocol}//${u.host}`.toLowerCase();
		return allow.has(origin);
	} catch {
		return false;
	}
}
