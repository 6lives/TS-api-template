import { User } from "../models/user-model"
import { ApiMethod, callApi } from "../utils/api-client"
import * as allure from "allure-js-commons"

export type UserResponse = {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: User[]
}

export async function getAllUsers(): Promise<UserResponse> {
    return allure.step('Requesting all users', async () => {
        const url = '/users'
        const response = await callApi<UserResponse>(ApiMethod.GET, url)
        return response
    })
}

