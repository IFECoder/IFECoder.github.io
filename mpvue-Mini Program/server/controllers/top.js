const {mysql} = require('../qcloud')
module.exports = async (ctx)=>{
    const top=await mysql('books')
                     .select('id','title','image','count')
                     .limit(9)
                     .orderBy('count','desc')
    ctx.state.data = {//返回排行榜数据
        list:top
    }
}