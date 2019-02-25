var {getConnection, excSql} = require('../utils/mysql_pool');
var {handleErr} = require('../utils/handleErr');
var {makeInfo} = require('../utils/makeInfo');

var information = async (ctx, next) => {
    var id = ctx.params.userid;
    var body = ctx.request.body;
    var connect = await getConnection(global.pool);
    await excSql(connect, 'UPDATE USERINFO SET SEX=?,note=?,univer=?,birthday=?,grade=? WHERE userid=?', [body.sex,body.note,body.univer,body.date,body.grade,id]).catch((err)=>{
        handleErr(err, ctx);
        throw Error(err.message)
    }); 
    makeInfo('个人信息更新成功', ctx);
};

var getUserInfo = async (ctx, next)=>{
    var id = ctx.params.userid;
    var connect = await getConnection(global.pool);
    let result = await excSql(connect, 'SELECT * FROM USERINFO WHERE USERID=?', [id]).catch((err)=>{
        handleErr(err, ctx);
        throw Error(err.message)
    }); 
    makeInfo(result, ctx);
}

module.exports = {
    'POST /noteapp/information/:userid': information,
    'GET /noteapp/getUserInfor/:userid': getUserInfo
};