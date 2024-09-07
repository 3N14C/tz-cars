import { OrderType } from '@/interfaces/interface-filter-params'
import {
	parseAsArrayOf,
	parseAsString,
	parseAsStringEnum,
	useQueryState,
} from 'nuqs'
import { useEffect } from 'react'

export const useFilterParams = () => {
	const [orderBy, setOrderBy] = useQueryState(
		'orderBy',
		parseAsString.withDefault('year')
	)
	const [orderType, setOrderType] = useQueryState(
		'orderType',
		parseAsStringEnum<OrderType>([OrderType.DESC])
	)
	const [brandId, setBrandId] = useQueryState(
		'brandId',
		parseAsArrayOf(parseAsString)
	)
	const [colorId, setColorId] = useQueryState(
		'colorId',
		parseAsArrayOf(parseAsString)
	)

	return {
		orderBy,
		setOrderBy,
		orderType,
		setOrderType,
		brandId,
		setBrandId,
		colorId,
		setColorId,
	}
}
