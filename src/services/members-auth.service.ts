import { IMemberAuthForm, IMemberAuthResponse } from '@/types/platform-auth.types'

import { axiosClassic } from '@/api/interceptors'

import {
	removeMemberFromStorage,
	saveMemberProfile,
	saveMemberTokenStorage
} from './members-auth-token.service'

export const membersAuthService = {
	async login(data: IMemberAuthForm) {
		const response = await axiosClassic.post<IMemberAuthResponse>('/members-auth/login', data)

		if (response.data.accessToken) saveMemberTokenStorage(response.data.accessToken)
		if (response.data.member) saveMemberProfile(response.data.member)

		return response
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IMemberAuthResponse>('/members-auth/login/access-token')

		if (response.data.accessToken) saveMemberTokenStorage(response.data.accessToken)

		return response
	},

	async logout() {
		const response = await axiosClassic.post<{ message: string }>('/members-auth/logout')

		if (response.data) removeMemberFromStorage()

		return response
	},

	async forgotPassword(email: string) {
		return axiosClassic.post<{ message: string }>('/members/forgot-password', { email })
	},

	async confirmPasswordReset(token: string) {
		return axiosClassic.post<{ message: string }>('/members/confirm-password-reset', { token })
	}
}
