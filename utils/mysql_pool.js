const mysql = require('mysql');
const dbConfig = {
    host:'127.0.0.1',
    user:'root',
    password:'88888888',
    database:'node'
};
// 创建一个数据库连接池
exports.createConnectPool = ()=>{
    let pool = mysql.createPool(dbConfig);
    return pool;
}
// 执行一条SQL语句
exports.getConnection = (pool)=>{
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if(err){
                reject(err);
            }else{
                resolve(connection);
            }
        });
    })
}

exports.excSql = (connection, sql, args)=>{
    return new Promise((resolve, reject)=>{
        connection.query(sql,args,(err, rows)=>{
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        });
    })
}
