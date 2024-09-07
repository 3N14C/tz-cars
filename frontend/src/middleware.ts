import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const middleware = async (req: NextRequest) => {
	const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url))
  }

	const verifiedToken = await jwtVerify(
		token,
		new TextEncoder().encode(process.env.JWT_SECRET)
	)

	if (!verifiedToken) {
		return NextResponse.redirect(new URL('/auth/sign-in', req.url))
	}

	if (verifiedToken.payload.role !== 'ADMIN') {
		return NextResponse.redirect(new URL('/auth/sign-in', req.url))
	}

	return NextResponse.next()
}

export default middleware

export const config = {
	matcher: ['/cars/create-car'],
}
