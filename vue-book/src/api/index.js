import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use((res)=>{
  return res.data; // 在这里统一拦截结果 把结果处理成res.data
});
//获取轮播图滑块
export let getSliders=()=>{
	return axios.get('/sliders');
}
//获取热门书
export let getHotBook=()=>{
	return axios.get('/hot');
}
//获取所有书
export let getBooks=()=>{
	return axios.get('/book');
}
//删除书
export let removeBook=(id)=>{
	return axios.delete(`/book?id=${id}`);
}
//获取一本书
export let findOneBook=(id)=>{
	return axios.get(`/book?id=${id}`);
}
//修改一本书
export let updateBook=(id,data)=>{
	return axios.put(`/book?id=${id}`,data);
}
export let addBook=(data)=>{
	return axios.post('/book',data);
}
//获取首页所有数据
export let getAll=()=>{
	return axios.all([getSliders(), getHotBook()]);
}
//加载更多时获取的数据
export let pagenation=(offset)=>{
	return axios.get(`page?offset=${offset}`);
}


