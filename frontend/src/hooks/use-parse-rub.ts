export const useParseRub = (price: number) => {
	return price.toLocaleString('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 2,
	})
}
