class DASHBOARD {
    private root = '/admin'

    LOGIN = `${this.root}/login`

    NEWS = `${this.root}/news`
    PROJECTS = `${this.root}/projects`
    ADMINISTRATION = `${this.root}/administration`
    DOCUMENTS = `${this.root}/documents`
    LOCAL_PRODUCTS = `${this.root}/local-products`
    COMMUNITY_SERVICES = `${this.root}/community-services`
    TOURIST_ATTRACTIONS = `${this.root}/tourist-attractions`
    PEOPLE_AND_VALUES = `${this.root}/people-and-values`
    STATISTICS = `${this.root}/statistics`

    CREATE_BLOG = `${this.root}/create-blog`
    EDIT_BLOG = `${this.root}/edit-blog`
    
    DECISIONS = `${this.root}/decisions`
    LOCAL_CALLS = `${this.root}/local-calls`

    CREATE_LOCAL_CALL = `${this.root}/create-local-call`
    EDIT_LOCAL_CALL = `${this.root}/edit-local-call`

    CREATE_DECISION = `${this.root}/create-decision`
    EDIT_DECISION = `${this.root}/edit-decision`

    getBlogEditPage(blogId: string) {
        return `${this.EDIT_BLOG}/${blogId}`
    }

    getDecisionEditPage(id: string) {
        return `${this.EDIT_DECISION}/${id}`
    }

    getLocalCallEditPage(id: string) {
        return `${this.EDIT_LOCAL_CALL}/${id}`
    }

    getLocalCallProjectsPage(localCallId: string) {
        return `${this.LOCAL_CALLS}/${localCallId}/projects`
    }

    getCreateProjectPage(localCallId: string) {
        return `${this.LOCAL_CALLS}/${localCallId}/projects/create`
    }

    getProjectEditPage(localCallId: string, projectId: string) {
        return `${this.LOCAL_CALLS}/${localCallId}/projects/edit/${projectId}`
    }
}

export const ADMIN_PAGES = new DASHBOARD()