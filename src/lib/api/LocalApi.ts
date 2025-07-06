import { ApiResponse, ProductsResponse } from "../interface/ApiResponse"
import { Category } from "../interface/Category"
import { RegisterRequest } from "../interface/Request"
import { SiteConfig } from "../interface/SiteConfig"
import { SiteInfo } from "../interface/SiteInfo"
import { Path, TestApi } from "./TestApi"

const API_PATH = "http://localhost:8080"
const TEST = true

export const LocalApi = {
    registerUser: (request: RegisterRequest) => post("register-user", request),
    getProducts: () => get<ProductsResponse>("get-products"),
    getSiteInfo: () => get<SiteInfo>("get-site-info"),
    getCategories: () => get<Category[]>("get-categories"),
    getHeroImages: () => get<string[]>("get-hero-images"),
    getConfig: () => get<SiteConfig>("get-config"),
    getBestSellingProducts: () => get<ProductsResponse>("get-best-selling-products")
}

async function post<T, Req = unknown>(path: string, body: Req | FormData) {
    try {
        if (TEST) {
            return TestApi[path as Path]()
        } else {
            let fetchOptions: RequestInit;
            if (body instanceof FormData) {
                fetchOptions = {
                    method: "POST",
                    body: body
                };
            } else {
                fetchOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                };
            }
            const result = await fetch(`${API_PATH}/${path}`, fetchOptions);
            return await result.json() as Promise<ApiResponse<T>>;
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function get<T>(path: string, urlParams?: Record<string, string>) {
    try {
        if (TEST) {
            const result = await TestApi[path as Path]()
            return result as ApiResponse<T>
        } else {
            const params = urlParams
                ? "?" + new URLSearchParams(urlParams).toString()
                : "";
            const result = await fetch(`${API_PATH}/${path}${params}`);
            return await result.json() as ApiResponse<T>;
        }
    } catch (e) {
        console.log(e)
        throw e
    }
}
