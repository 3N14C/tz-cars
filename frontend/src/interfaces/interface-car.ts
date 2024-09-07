import { Brand } from './interface-brand'
import { Color } from './interface-color'

export enum MotorType {
	DIESEL = 'дизельный',
	GASOLINE = 'бензиновый',
	ELECTRIC = 'электрический',
}

export enum TransmissionType {
	MANUAL = 'механическая',
	AUTOMATIC = 'автоматическая',
	ROBOTIC = 'роботизированная',
}

export interface Car {
	id: string
	name: string
	img: string
	price: number
	year: string
	motor: MotorType
	transmission: TransmissionType
	reserve?: string

	brand: Brand
	color: Color
}
