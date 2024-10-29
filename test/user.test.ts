import { getAllUsers } from "../resources/user-resource"

describe('User tests', () => {

    test('Expect users to have emails', async () => {
        const users = await getAllUsers()
        
        users.data.map(user => expect(user.email).toBeTruthy())
    })
})