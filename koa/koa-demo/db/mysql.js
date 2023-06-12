const mysql = require('mysql')
const {dataBase} = require('../config/dbConfig')

const pool = mysql.createPool({
    host: dataBase.HOST,
    user: dataBase.USER,
    password: dataBase.PASSWORD,
    database: dataBase.DATABASE
})

exports.query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
                //console.log(err, "数据库连接失败");
                resolve({
                    code: 500,
                })
            } else {
                //console.log("数据库连接成功");
                connection.query(sql, values, (err, results) => {
                    if (err) {
                        reject(err)
                        resolve({
                            code: 400
                        })
                    } else {
                        resolve({
                            code: 200,
                            results,
                        })
                        connection.release()
                        //resolve(rows)
                    }
                    //connection.release() // 释放连接池
                })
            }
        })
    })
}