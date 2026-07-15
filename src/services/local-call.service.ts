import { axiosClassic, axiosWithAuth } from '@/api/interceptors'
import { ImageLinkResponse } from '@/types/blog.types'
import type {
	IGetLocalCallsParams,
	IGetProjectsParams,
	ILocalCallResponse,
	ILocalCallsResponse,
	IProjectsResponse,
	TypeLocalCallFormState,
	TypeProjectFormState
} from '@/types/local-call.types'

class LocalCallService {
	private BASE_URL = '/local-call'

	async getAllLocalCalls(params: IGetLocalCallsParams) {
		return axiosClassic.get<ILocalCallsResponse>(`${this.BASE_URL}/`, { params })
	}

	async getLocalCallById(id: string) {
		return axiosClassic.get<ILocalCallResponse>(`${this.BASE_URL}/${id}`)
	}

	async createLocalCall(data: TypeLocalCallFormState) {
		return axiosWithAuth.post<ILocalCallResponse>(`${this.BASE_URL}/`, data)
	}

	async updateLocalCall(id: string, data: TypeLocalCallFormState) {
		return axiosWithAuth.put<ILocalCallResponse>(`${this.BASE_URL}/${id}`, data)
	}

	async deleteLocalCall(id: string) {
		return axiosWithAuth.delete<ILocalCallResponse>(`${this.BASE_URL}/${id}`)
	}

	async getProjects(localCallId: string, params: IGetProjectsParams) {
		return axiosClassic.get<IProjectsResponse>(`${this.BASE_URL}/${localCallId}/projects`, { params })
	}

	async addProject(localCallId: string, data: TypeProjectFormState) {
		return axiosWithAuth.post<ILocalCallResponse>(`${this.BASE_URL}/${localCallId}/project`, data)
	}

	async updateProject(localCallId: string, projectId: string, data: TypeProjectFormState) {
		return axiosWithAuth.put<ILocalCallResponse>(
			`${this.BASE_URL}/${localCallId}/project/${projectId}`,
			data
		)
	}

	async deleteProject(localCallId: string, projectId: string) {
		return axiosWithAuth.delete<ILocalCallResponse>(`${this.BASE_URL}/${localCallId}/project/${projectId}`)
	}

	// For PDF upload (project's own linked document)
	async generateUploadLink() {
		return axiosWithAuth.post<ImageLinkResponse>(`${this.BASE_URL}/generate-upload-link`)
	}

	// For image upload (local call or project cover image)
	async generateImageUploadLink() {
		return axiosWithAuth.post<ImageLinkResponse>(`${this.BASE_URL}/generate-image-upload-link`)
	}

	async uploadFile(uploadUrl: string, file: File) {
		return axiosClassic.put(uploadUrl, file, { headers: { 'Content-Type': file.type } })
	}

	async deleteFiles(fileUrls: string[]) {
		return axiosWithAuth.post(`${this.BASE_URL}/delete-files`, { imageUrls: fileUrls })
	}

	async downloadProjectResultsPdf(id: string, projectId: string, lang: 'ro' | 'ru' | 'en') {
		return axiosWithAuth.post(
			`${this.BASE_URL}/${id}/project/${projectId}/results-pdf`,
			{},
			{ params: { lang }, responseType: 'blob' }
		)
	}
}

export const localCallService = new LocalCallService()
