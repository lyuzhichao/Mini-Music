import lvRequest from './index'

export function getBanner(){
    return lvRequest.get('/banner',{type:2})
}

export function getRankings(idx){
    return lvRequest.get('/top/list/',{idx})
}

export function getSongMenu(cat='全部',limit=6,offset=0){
    return lvRequest.get('/top/playlist',{
        cat,
        limit,
        offset
    })
}

export function getMenuDetail(id) {
    return lvRequest.get('/playlist/detail/dynamic',{id})
}