import { load } from 'ts-dotenv';
import * as allure from "allure-js-commons"
import { randomUUID } from "crypto"
import { json } from 'stream/consumers';


export enum ApiMethod {
    GET,
    POST,
    PATCH,
    DELETE,
}

export class ApiCall {

    private env: {
        BASEURL: String,
    }

    constructor() {
        this.env = load({
            BASEURL: String
        })
    }

    async callApi<T>(method: ApiMethod, url: string, body?: string, headers?: HeadersInit) {
        await allure.step(`Processing an api call: ${method} ${url}`, async () => {

            const requestUrl = this.env.BASEURL + url
            let request: Response
            let response

            try {
                request = await fetch(requestUrl, {
                    method: method.toString(),
                    headers: headers ? headers : undefined,
                    body: ApiMethod.POST || ApiMethod.PATCH ? JSON.stringify(body) : null,
                })

                response = await request.json()
                allure.attachment(randomUUID().toString(), `Request:\n${JSON.stringify(headers, null, 2)}\n${JSON.stringify(body, null, 2)}
                                                        Response:\n${JSON.stringify(request.headers)}\n${JSON.stringify(response, null, 2)}`,
                                                        allure.ContentType.TEXT)
                if (!request.ok) { throw new Error(`Request is not ok ${method} ${requestUrl} ${response}`) }
            } catch (e) {
                throw new Error((e as Error).message)
            }

            return response as T
        })
    }


}