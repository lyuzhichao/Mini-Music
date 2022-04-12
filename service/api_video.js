import lvRequest from './index'


export function getTopMV(offset,limit=10){
    return lvRequest.get('/top/mv',{
        offset,
        limit
    })
}

export function getVideoURL(id){
    return lvRequest.get('/mv/url',{id})
}
export function getVideoDetail(mvid){
    return lvRequest.get('/mv/detail',{mvid})
}
export function getVideoRelated(id){
    return lvRequest.get('/related/allvideo',{id})
}