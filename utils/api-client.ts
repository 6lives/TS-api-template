import 'dotenv/config'
import * as allure from "allure-js-commons"
import { randomUUID } from "crypto"
import { linkBuilder } from './url-helper';


export enum ApiMethod {
    GET,
    POST,
    PATCH,
    DELETE,
}

type RequestOptions = {
    body?: string,
    headers?: HeadersInit,
    statusCode?: number
}


export async function callApi<T>(method: ApiMethod, url: string, options?: RequestOptions) {
    return allure.step(`Processing an api call: ${method} ${url}`, async () => {

        const BASEURL = process.env.BASEURL
        if (!BASEURL) {
            throw new Error('Env variables not loaded')
        }

        const requestUrl = await linkBuilder(BASEURL, url)
        let request: Response
        let response: any

        try {
            request = await fetch(requestUrl, {
                method: method.toString(),
                headers: options?.headers ? options.headers : undefined,
                body: ApiMethod.POST || ApiMethod.PATCH ? JSON.stringify(options?.body) : null,
            })

            response = await request.json()

            allure.attachment(randomUUID().toString(),
                `Request:\n${JSON.stringify(options?.headers, null, 2)}\n${JSON.stringify(options?.body, null, 2)}
            Response:\n${JSON.stringify(request.headers, null, 2)}\n${JSON.stringify(response, null, 2)}`,
                allure.ContentType.TEXT)

            if (!request.ok && !options?.statusCode) { throw new Error(`Request is not ok ${method} ${requestUrl} ${response}`) }
            if (options?.statusCode) {
                expect(request.status).toBe(options.statusCode)
            }
        } catch (e) {
            throw new Error((e as Error).message)
        }

        return response as T
    })
}


