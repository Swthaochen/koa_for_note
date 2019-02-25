var {getConnection, excSql} = require('../utils/mysql_pool');
var {handleErr} = require('../utils/handleErr');
var {makeInfo} = require('../utils/makeInfo');

var insert_work = async (ctx, next) => {
    var id = ctx.params.userid;
    var body = ctx.request.body;
    var connect = await getConnection(global.pool);
    await excSql(connect, 'INSERT INTO NOTELIST (userid,notetitle,noteCon,starttime,endtime,isFinish) VALUES (?,?,?,?,?,0)', [body.userid,body.notetitle,body.noteCon,body.starttime,body.endtime,0]).catch((err)=>{
        handleErr(err, ctx);
        throw Error(err.message)
    }); 
    makeInfo('插入成功', ctx);
};

module.exports = {
    'POST /noteapp/insert_work/:userid': insert_work
};