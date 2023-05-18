const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'pro',
    password: '123456'
})

connection.query(
    'SELECT * FROM myinform',
    (err, data) => {
        if(err) throw err
        console.log(data)

        connection.close()
    }
)