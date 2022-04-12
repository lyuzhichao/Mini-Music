import lvRequest from './index'

export function getSongDetai(ids) {
    return lvRequest.get('/song/detail',{ids})
}

export function getSongLyric(id) {
    return lvRequest.get('/lyric',{id})
}