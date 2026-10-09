export class PaginationController {
    private currentPage = 1
    private totalPages: number | null = null
    private loading = false

    public get page() {
        return this.currentPage
    }

    public get isLoading() {
        return this.loading
    }

    public get hasMore() {
        return this.totalPages === null || this.currentPage < this.totalPages
    }

    public startLoading() {
        if (this.loading || !this.hasMore) {
            return false
        }

        this.loading = true
        return true
    }

    public finishLoading(totalPages: number) {
        this.totalPages = totalPages
        this.loading = false
    }

    public failLoading() {
        this.loading = false
    }

    public nextPage() {
        if (!this.loading && this.hasMore) {
            this.currentPage += 1
        }
    }

    public reset() {
        this.currentPage = 1
        this.totalPages = null
        this.loading = false
    }
}