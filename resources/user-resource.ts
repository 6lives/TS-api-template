import { User } from "../models/user-model"
import { ApiMethod, callApi } from "../utils/api-client"
import * as allure from "allure-js-commons"

export type UsersResponse = {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: User[]
}

export type UserResponse = {
    data: User
}

export async function getAllUsers(): Promise<UsersResponse> {
    return allure.step('Requesting all users', async () => {
        const url = '/users'
        const response = await callApi<UsersResponse>(ApiMethod.GET, url)
        return response
    })
}

export async function getUser(userId: number, statusCode?: number): Promise<UserResponse> {
    return allure.step(`Request user with id: ${userId}`, async () => {
        const url = '/users/' + userId
        const response = await callApi<UserResponse>(ApiMethod.GET, url, { statusCode: statusCode })
        return response
    })
}