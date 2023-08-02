import mysql from 'mysql'

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_mullinra',
    password        : 'zqUdmw0RmmhR',
    database        : 'cs340_mullinra'
})

const db = {
    pool: pool,
}

export default db