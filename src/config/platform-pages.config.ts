class PLATFORM {
	private root = '/voting'

	LOGIN = `${this.root}/login`
	FORGOT_PASSWORD = `${this.root}/forgot-password`
	RESET_PASSWORD = `${this.root}/reset-password`

	LOCAL_CALLS = `${this.root}/local-calls`
	DECISIONS = `${this.root}/decisions`

	getLocalCallDetailPage(id: string) {
		return `${this.LOCAL_CALLS}/${id}`
	}

	getProjectVotePage(localCallId: string, projectId: string) {
		return `${this.LOCAL_CALLS}/${localCallId}/projects/${projectId}`
	}

	getDecisionVotePage(id: string) {
		return `${this.DECISIONS}/${id}`
	}
}

export const PLATFORM_PAGES = new PLATFORM()
