'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'

interface Props {
	children: React.ReactNode
}

export const Providers: FC<Props> = ({ children }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	})

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
