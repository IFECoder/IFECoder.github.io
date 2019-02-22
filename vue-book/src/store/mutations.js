import * as Types from './mutations-type.js';
const mutations = {
  [Types.ADD_CART](state,book){
    // book是添加的一本书，如果有这本书 累加的是数量，如果没有数量为1 放到cartList中
    let product = state.cartList.find(item=>item.bookId===book.bookId);
    if(product){
      product.bookCount+=1; //还要更新掉原数组，否则不会刷新
      product.bookAllprice=product.bookCount*product.bookPrice;
      state.cartList = [...state.cartList];
    }else{
      book.bookCount = 1;
      //用新数组替换掉老数组
      book.bookAllprice=book.bookPrice;
      state.cartList = [...state.cartList,book];
      
    }
  },
  [Types.REMOVE_CART](state,id){
     state.cartList = state.cartList.filter(item=>item.bookId !== id)
  },
  [Types.CHANGE_COUNT](state,payload){
     payload.book.bookCount += payload.num;
     payload.book.bookAllprice=payload.book.bookCount*payload.book.bookPrice;
     state.cartList = [...state.cartList]
  }
};
export default mutations;
