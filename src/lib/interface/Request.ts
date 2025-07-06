
export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
}

export interface GetProductsRequest {
    pagination: Pagination
}

interface Pagination {
    max: number
    pageNum: number
}