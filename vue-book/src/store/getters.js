let getters = {
  count:(state)=>state.cartList.reduce((prev,next)=>prev+next.bookCount,0),
  Allprice(state){
    return state.cartList.reduce((prev,next)=>prev+next.bookAllprice,0)
  }
};
export default getters;
