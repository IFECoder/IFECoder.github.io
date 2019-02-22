const {mysql} = require('../qcloud')
//post请求在body体里面
module.exports = async (ctx)=>{
    const {openid,bookid,comment,phone,location} = ctx.request.body
    try {
        await mysql('comments').insert({//查询到某个表之后做插入处理
            openid,bookid,comment,phone,location
        })
        ctx.state.data={
            msg:'success'
        }
    } catch (error) {
        ctx.state={
            code:-1,
            data:{
               msg:'评论失败:'+error.sqlMessage
            }
        }
    }



}