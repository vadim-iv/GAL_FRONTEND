import { axiosClassic, axiosWithAuth } from '@/api/interceptors'
import { ImageLinkResponse } from '@/types/blog.types'
import type { IMemberResponse, TypeMemberFormState } from '@/types/member.types'

class MemberService {
	private BASE_URL = '/members'

	async getAllMembers() {
		const response = await axiosClassic.get<IMemberResponse[]>(`${this.BASE_URL}/`)
		return response
	}

	async createMember(data: TypeMemberFormState) {
		const response = await axiosWithAuth.post<IMemberResponse>(`${this.BASE_URL}/`, data)
		return response
	}

	async updateMember(id: string, data: TypeMemberFormState) {
		const response = await axiosWithAuth.put<IMemberResponse>(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteMember(id: string) {
		const response = await axiosWithAuth.delete<IMemberResponse>(`${this.BASE_URL}/${id}`)
		return response
	}

	async generateUploadLink() {
		const response = await axiosWithAuth.post<ImageLinkResponse>(`${this.BASE_URL}/generate-upload-link`)
		return response
	}

	async uploadImage(uploadUrl: string, file: File) {
		const response = await axiosClassic.put(uploadUrl, file, { headers: { 'Content-Type': file.type } })
		return response
	}

	async deleteImages(imageUrls: string[]) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/delete-files`, { imageUrls })
		return response
	}
}

export const memberService = new MemberService()
