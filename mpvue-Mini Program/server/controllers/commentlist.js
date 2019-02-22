//做了联表查询数据
const {mysql} = require('../qcloud')
module.exports = async (ctx)=>{
    const {bookid,openId} = ctx.request.query
    const connect = mysql('comments')
                        .select("comments.*",'cSessionInfo.user_info')
                        .join('cSessionInfo','comments.openid','cSessionInfo.open_id')                   
    let comments;
    if (bookid) {
        // 图书详情也的评论列表
        comments = await connect.where('bookid',bookid)
    } else if(openId){
        // 根据个人的openId筛选
        comments = await connect.where('openId',openId)
    }
    ctx.state.data = {
        list:comments.map(v=>{//做一个映射，将user_info转成json对象
            const info = JSON.parse(v.user_info)
            return Object.assign({},v,{
                title:info.nickName,
                image:info.avatarUrl  
            })
        })
    }
}