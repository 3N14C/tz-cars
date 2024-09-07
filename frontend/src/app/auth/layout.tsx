interface Props {
	children: React.ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<div className='max-w-[900px] mx-auto p-5 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.4)]'>
			{children}
		</div>
	)
}

export default Layout
