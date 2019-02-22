import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
export function getSingerList() {//获取歌手数据
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}
export function getSingerDetial(singerId) {//获取歌手详细数据
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    loginUin:0,
    hostUin:0,
    needNewCode: 0,
    platform: 'yqq',
    singermid:singerId,
    begin: 0,
    num: 100,
    songstatus: 1
  })

  return jsonp(url, data, options)
}