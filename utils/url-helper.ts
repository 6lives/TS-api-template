import * as allure from "allure-js-commons"

export async function linkBuilder(baseUrl: string, path: string): Promise<string> {
    return allure.step('Check that link is correct', () => {
        if (baseUrl.endsWith('/') && path.startsWith('/')) {
            throw new Error(`Check url, double slash detected: ${baseUrl+path}`)
        }
        return baseUrl+path
    })
}