'use client'

import { useEffect, useState } from 'react'

import { ICurrentMember } from '@/types/platform-auth.types'

import { getMemberProfile } from '@/services/members-auth-token.service'

export function useCurrentMember() {
	const [member, setMember] = useState<ICurrentMember | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setMember(getMemberProfile<ICurrentMember>())
		setIsLoading(false)
	}, [])

	return { member, isLoading }
}
