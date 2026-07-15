import Cookies from 'js-cookie'

export enum MemberEnumTokens {
	'ACCESS_TOKEN' = 'memberAccessToken'
}

const MEMBER_PROFILE_KEY = 'memberProfile'

export const getMemberAccessToken = () => {
	const accessToken = Cookies.get(MemberEnumTokens.ACCESS_TOKEN)
	return accessToken || null
}

export const saveMemberTokenStorage = (accessToken: string) => {
	Cookies.set(MemberEnumTokens.ACCESS_TOKEN, accessToken, {
		sameSite: 'lax',
		expires: 1
	})
}

export const removeMemberFromStorage = () => {
	Cookies.remove(MemberEnumTokens.ACCESS_TOKEN)
	localStorage.removeItem(MEMBER_PROFILE_KEY)
}

// The member's own profile (name/email/_id) has no dedicated backend session
// endpoint to re-derive it from, and the header/vote-ownership checks need it
// synchronously — so it's cached alongside the token at login time.
export const saveMemberProfile = <T>(member: T) => {
	localStorage.setItem(MEMBER_PROFILE_KEY, JSON.stringify(member))
}

export const getMemberProfile = <T>(): T | null => {
	const raw = localStorage.getItem(MEMBER_PROFILE_KEY)
	if (!raw) return null

	try {
		return JSON.parse(raw) as T
	} catch {
		return null
	}
}
