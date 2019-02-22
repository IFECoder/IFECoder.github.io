//做了联表查询数据
const {mysql} = require('../qcloud')
module.exports = async (ctx)=>{
    const {page,openId} = ctx.request.query
    const size = 10
    const connected =  mysql('books')
                      .select("books.*",'cSessionInfo.user_info')
                      .join('cSessionInfo','books.openid','cSessionInfo.open_id')
                      .orderBy('books.id','desc')
    let books;
    if (openId) {// 根据opid过滤
        books = await connected.where('books.openId',openId)
    } else {// 全部图书 分页
        books = await connected.limit(size)
                       .offset(Number(page) * size)        
    }
    ctx.state.data = {
        list:books.map(v=>{//做一个映射，将user_info转成json对象
            const info = JSON.parse(v.user_info)
            return Object.assign({},v,{
                user_info:info  
            })
        })
    }
}