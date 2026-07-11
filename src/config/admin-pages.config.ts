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

    getBlogEditPage(blogId: string) {
        return `${this.EDIT_BLOG}/${blogId}`
    }
}

export const ADMIN_PAGES = new DASHBOARD()