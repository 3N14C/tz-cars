import { Car } from "./interface-car"

export interface Color {
  id: string
  name: string
  hex: string

  cars: Car[]
}
