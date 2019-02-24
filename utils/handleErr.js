exports.handleErr = (err, ctx)=>{
    let errInfo = {
        code: 500,
        body: null,
        msg: err.message || '请求失败'
    };
    ctx.response.body = errInfo;
    return errInfo;
}