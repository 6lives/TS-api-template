import { getAllUsers, getUser } from "../resources/user-resource"

describe('User tests', () => {

    test('Expect users to have emails', async () => {
        const users = await getAllUsers()
        
        users.data.map(user => expect(user.email).toBeTruthy())
    })

    test('Expect >0 users in the list', async () => {
        const users = await getAllUsers()

        expect(users.data.length).toBeGreaterThan(0)
    })

    test.each([1,2,3,4,5])('Expect user with id exists', async (userId) => {
        const user = await getUser(userId)

        expect(user.data.id).toEqual(userId)
    })

    test('Expect 404 error, user not exist', async () => {
        const user = await getUser(20, 404)

        expect(user).toEqual({})
    })
})