'use client'

import { parseAsInteger, useQueryState } from 'nuqs'
import { useState } from 'react'

export const usePagination = () => {
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
	const [offset, setOffset] = useState<number>(page * 6 - 6)
	const [limit, setLimit] = useState<number>(page * 6)

	const toNextPage = () => {
		setPage((prev) => prev + 1)
		setLimit((prev) => prev + 6)
		setOffset((prev) => prev + 6)
	}

	const toPreviousPage = () => {
		if (page === 1) return
		setPage((prev) => prev - 1)
		setLimit((prev) => prev - 6)
		setOffset((prev) => prev - 6)
	}

	return {
		page,
		setPage,
		offset,
		setOffset,
		limit,
		setLimit,
		toNextPage,
		toPreviousPage,
	}
}
