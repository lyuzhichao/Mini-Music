import lvRequest from "./index";

export function getSearchHot() {
    return lvRequest.get('/search/hot',{})
}

export function getSearchSuggest(keywords) {
    return lvRequest.get('/search/suggest',{
        keywords,
        type:'mobile'
    })
    
}

export function getSearchResult(keywords) {
    return lvRequest.get('/search',{
        keywords
    })
}