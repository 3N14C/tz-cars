export enum OrderType {
  ASC = 'asc',
  DESC = 'desc',
}

export interface FilterParams {
  orderBy?: string
  orderType?: OrderType | null
  colorId?: string[] | null
  brandId?: string[] | null
}
