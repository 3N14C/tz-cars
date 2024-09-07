'use client'

import { FC } from 'react'
import { GlobalFilters } from './global-filters'
import { SideBarAccordion } from './side-bar-accordion'

export const SideBar: FC = () => {
	return (
		<div className='sticky top-0 w-1/4 border rounded-lg p-3'>
			<p className='font-bold text-xl border-b pb-3'>Фильтрация</p>
			<GlobalFilters />
			<div className=''>
				<SideBarAccordion />
			</div>
		</div>
	)
}
