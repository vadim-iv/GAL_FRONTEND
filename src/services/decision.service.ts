import { axiosClassic, axiosWithAuth } from '@/api/interceptors'
import { ImageLinkResponse } from '@/types/blog.types'
import type {
	IDecisionResponse,
	IDecisionsResponse,
	IGetDecisionsParams,
	TypeDecisionFormState
} from '@/types/decision.types'

class DecisionService {
	private BASE_URL = '/decision'

	async getAllDecisions(params: IGetDecisionsParams) {
		return axiosClassic.get<IDecisionsResponse>(`${this.BASE_URL}/`, { params })
	}

	async getDecisionById(id: string) {
		return axiosClassic.get<IDecisionResponse>(`${this.BASE_URL}/${id}`)
	}

	async createDecision(data: TypeDecisionFormState) {
		return axiosWithAuth.post<IDecisionResponse>(`${this.BASE_URL}/`, data)
	}

	async updateDecision(id: string, data: TypeDecisionFormState) {
		return axiosWithAuth.put<IDecisionResponse>(`${this.BASE_URL}/${id}`, data)
	}

	async deleteDecision(id: string) {
		return axiosWithAuth.delete<IDecisionResponse>(`${this.BASE_URL}/${id}`)
	}

	// For image upload (decision cover image)
	async generateImageUploadLink() {
		return axiosWithAuth.post<ImageLinkResponse>(`${this.BASE_URL}/generate-image-upload-link`)
	}

	async uploadFile(uploadUrl: string, file: File) {
		return axiosClassic.put(uploadUrl, file, { headers: { 'Content-Type': file.type } })
	}

	async deleteFiles(fileUrls: string[]) {
		return axiosWithAuth.post(`${this.BASE_URL}/delete-files`, { imageUrls: fileUrls })
	}

	async downloadResultsPdf(id: string, lang: 'ro' | 'ru' | 'en') {
		return axiosWithAuth.post(
			`${this.BASE_URL}/${id}/results-pdf`,
			{},
			{ params: { lang }, responseType: 'blob' }
		)
	}
}

export const decisionService = new DecisionService()
