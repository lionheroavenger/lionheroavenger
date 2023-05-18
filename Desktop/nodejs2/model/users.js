const fs = require('fs')
const path = require('path')

const db = require('../helpers/database')

module.exports = class Users{
    constructor(login, password, firstname, lastname, role){
            this.login = login
            this.password = password
            this.firstname = firstname
            this.lastname = lastname
            this.role = role
    }

    saveUser() {
        return db.execute(`SELECT users.*,roles.role 
            FROM users
            INNER JOIN roles
            ON users.role_id=roles.id
            WHERE users.login=? AND users.password=sha(?)`,
        [
            this.login, 
            this.password
        ])
    }

    setId(id) {
        this.id = id
    }

    setFirstname(firstname) {
        this.firstname = firstname
    }

    setLastname(lastname) {
        this.lastname = lastname
    }

    save() {
        if (!this.id || !(+this.id) || +this.id < 1) {
            throw new Error('Invalid product Id', this.id)
        }
        console.log('hammas togri')
        return db.execute('UPDATE users SET firstname=?, lastname=? WHERE id=?',
            [this.firstname, this.lastname ,this.id])
    }

    static async authenticate (login, password) {
        const qiymat =  await db.execute(`SELECT users.*,roles.role 
            FROM users
            INNER JOIN roles
            ON users.role_id=roles.id
            WHERE users.login=? AND users.password=sha(?)`,
        [
            login, 
            password
        ])

        if(qiymat[0]){
            return qiymat[0]
        }

        return null
    }

    static insertUser() {
        return db.execute(`INSERT INTO users (login, password, role_id, firstname, lastname) 
        VALUES(?,?,?,?,?)`,
        [
            this.login, 
            this.password, 
            this.role_id, 
            this.firstname, 
            this.lastname
        ])
    }
}