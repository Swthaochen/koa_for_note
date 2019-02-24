var {getConnection, excSql} = require('../utils/mysql_pool')
var {handleErr} = require('../utils/handleErr');
var {makeInfo} = require('../utils/makeInfo');
var request = require('request');

var fn_index = async (ctx, next) => {
    var openId = await getUserId(ctx.query).catch((err)=>{
        handleErr(err, ctx);
        throw Error(err.message)
    });
    var connect = await getConnection(global.pool);
    let result = await excSql(connect, 'select * from userinfo where openid=?', [openId]).catch((err)=>{
        handleErr(err, ctx);
        throw Error(err.message)
    });
    if(result.length === 0){
        result = await excSql(connect, 'INSERT INTO userinfo VALUES (?,?,?,?,?,?,?)', ['openId',null,null,null,openId,null,null]).catch((err)=>{
            handleErr(err, ctx);
            throw Error(err.message)
        });
        result = await excSql(connect, 'select * from userinfo where userid=?', [openId]).catch((err)=>{
            handleErr(err, ctx);
            throw Error(err.message)
        });
    }
    makeInfo(result, ctx);
    ctx.cookies.set('userid',result[0].userId,{expires:new Date('2018-01-01'),maxAge:60*1000,httpOnly:true})
};

// 获取用户的openid
var getUserId = (req)=>{
    return new Promise((resolve, reject)=>{
        request.get(`https://api.weixin.qq.com/sns/jscode2session?appid=wx8b2c97751050ce90&secret=04228ab35a0fc1552f763cab4a9c1dcd&js_code=${req.js_code}&grant_type=authorization_code`, function (error, response, body) {
            if (!error && response.statusCode == 200 && JSON.parse(body).openid != undefined) {
                resolve(JSON.parse(body).openid);
            }else {
                reject(new Error('fail to get openid'))
            }
        }) 
    })
}

module.exports = {
    'GET /noteapp/getUserInfo': fn_index,

    // 'POST /signin': fn_signin
};