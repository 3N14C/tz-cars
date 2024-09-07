'use server'

import { cookies } from 'next/headers'

export const setCookie = async (token: string) => {
	cookies().set('token', token, {
		path: '/',
		maxAge: 60 * 60 * 24,
		sameSite: 'strict',
	})
}

export const getCookie = async () => {
	const token = cookies().get('token')?.value

	return { token }
}
