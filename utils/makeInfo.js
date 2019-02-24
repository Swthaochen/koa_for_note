exports.makeInfo = (body, ctx, msg)=>{
    let errInfo = {
        code: 200,
        body: body,
        msg: msg || '请求成功'
    };
    ctx.response.body = errInfo;
    return errInfo;
}