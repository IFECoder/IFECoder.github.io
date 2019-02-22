import {playMode} from 'common/js/config'
import {loadSearch,loadPlay,loadFavorite} from 'common/js/cache.js'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  currentIndex: -1,
  disc: {},
  topList: {},
  mode: playMode.sequence,
  searchHistory:loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state