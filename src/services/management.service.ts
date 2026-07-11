import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import type { IManagementResponse } from "@/types/management.types";

export class ManagementService {
    private BASE_URL = '/management'

    async getManagement() {
        const response = await axiosClassic.get<IManagementResponse>(
            `${this.BASE_URL}/`
        )

        return response
    }

    async updateMainImage(main_image: string) {
        const response = await axiosWithAuth.patch<IManagementResponse>(
            `${this.BASE_URL}/main-image`,
            { main_image }
        )

        return response
    }
}

export const managementService = new ManagementService()