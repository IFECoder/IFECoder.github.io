import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

//获取热门搜索数据
export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

//获取搜索的数据列表
export function search(query,page,zhida,perpage) {
  const url = '/api/search'
  const data = Object.assign({}, commonParams, {
    w:query,
    p:page,
    catZhida:zhida?1:0,
    platform: 'h5',
    needNewCode: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perpage,
    n: 20,
    remoteplace: 'txt.mqq.all'
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
