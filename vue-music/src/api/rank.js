import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

//获取排行榜数据
export function getToplist() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
export function getMusiclist(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
  	topid,
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top'
  })

  return jsonp(url, data, options)
}