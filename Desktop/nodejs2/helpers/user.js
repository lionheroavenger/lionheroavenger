const { users } = require('../data')

const db = require('../helpers/database')

const isValidUser = (login, password) => {
    /*users.find((users) => {
        return users.login === login && users.password === password
    })*/

    return db.execute(`SELECT users.*,roles.role 
    FROM users
    INNER JOIN roles
    ON users.role_id=roles.id
    WHERE users.login=? AND users.password=sha(?)`,
        [login, password])
}

const updateUser = (user) => {
    console.log('productId',user)
    if (!user.id || !(+user.id) || +user.id < 1) {
        
        throw new Error('Invalid product Id', user.id,user.role_id)
        
    }
    return db.execute('UPDATE users SET firstname=?, lastname=? WHERE id=?',
        [user.firstname, user.lastname ,user.id])
}


module.exports = {
    isValidUser: isValidUser,
    updateUser: updateUser
} 