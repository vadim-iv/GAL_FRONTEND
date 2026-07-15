import axios, { CreateAxiosDefaults } from 'axios'

import { errorCatch } from './error'
import { getMemberAccessToken, removeMemberFromStorage } from '@/services/members-auth-token.service'
import { membersAuthService } from '@/services/members-auth.service'

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
}

const axiosWithMemberAuth = axios.create(options)

axiosWithMemberAuth.interceptors.request.use(config => {
	const accessToken = getMemberAccessToken()
	if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`
	return config
})

axiosWithMemberAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (
			error?.response?.status === 401 ||
			errorCatch(error) === 'jwt expired' ||
			(errorCatch(error) === 'jwt must be provided' && error.config && !error.config._isRetry)
		) {
			originalRequest._isRetry = true
			try {
				await membersAuthService.getNewTokens()
				return axiosWithMemberAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeMemberFromStorage()
			}
		}
		throw error
	}
)

export { axiosWithMemberAuth }
