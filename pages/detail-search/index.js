// pages/detail-search/index.js
import {getSearchHot,getSearchSuggest,getSearchResult} from '../../service/api_search.js'
import {debounce} from '../../utils/debounce'
import stringToNodes from '../../utils/string2nodes.js'
import {playerStore} from '../../store/index'

const getSearchSuggestData=debounce(getSearchSuggest,500)
Page({

    /**
     * Page initial data
     */
    data: {
        hotKeyWords:[],
        suggestSongs:[],
        suggestSongNodes:[],
        searchValue:'',
        resultSongs:[]
    },

    /**
     * Lifecycle function--Called when page load
     */
        handleSongItemClick(event){
        const index=event.currentTarget.dataset.index
        playerStore.setState('playListIndex',index)
        playerStore.setState('playListSongs',this.data.resultSongs)
    },
    getPageData(){
        getSearchHot().then(res=>{
            this.setData({hotKeyWords:res.result.hots})
        })
    },
    handleSearchAction(){
        const searchValue=this.data.searchValue
        getSearchResult(searchValue).then(res=>{
            this.setData({resultSongs:res.result.songs})
        })
    },

    handleKeywordItemClick(event){
        const keyword=event.currentTarget.dataset.keyword
        this.setData({searchValue:keyword})
        this.handleSearchAction()
    },

    handleSearchInput(event){
        const searchValue=event.detail
        this.setData({searchValue})
        if (searchValue.length){
            getSearchSuggestData(searchValue).then(res=>{
                const suggestSongs=res.result.allMatch
                this.setData({suggestSongs})
                const suggestKeyWords=suggestSongs.map(item=>item.keyword)
                const suggestSongNodes=[]
                for (const keyword of suggestKeyWords){
                    const nodes=stringToNodes(keyword,searchValue)
                    suggestSongNodes.push(nodes)
                }
                this.setData({suggestSongNodes})
            })
        } else {
            getSearchSuggestData.cancel()
            this.setData({suggestSongs:[]})
            this.setData({resultSongs:[]})
            this.setData({suggestSongNodes:[]})
        } 
    },
    onLoad: function (options) {
        this.getPageData()
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})