import { axiosInstance } from "@/configs/config-axios"
import { Brand } from "@/interfaces/interface-brand"

export const BrandService = {
  getAll: async () => {
    const response = await axiosInstance.get<Brand[]>('brands/get-all')

    return response.data
  }
}
