// pages/home-music/index.js
import {getBanner,getSongMenu} from '../../service/api_music'
import queryRect from '../../utils/query-rect'
import {debounce} from '../../utils/debounce'
import {rankingStore,rangkingMap,playerStore} from '../../store/index'

const debounceQueryRect=debounce(queryRect,200)

Page({
    /**
     * Page initial data
     */
    data: {
        value:'',
        banners:[],
        bannerHeight:150,
        recoomendSongs:[],
        recommendSongMenu:[],
        hotSongMenu:[],
        rankings:{0:{},2:{},3:{}},
        currentSong:{},
        isPlaying:false,
        playingName:'pause',
        playAnimationStatus:'running',
    },
    handleClickSearch(){
        wx.navigateTo({
          url: '/pages/detail-search/index',
        })
    },
    getPageData(){
        getBanner().then(res=>{
            this.setData({banners:res.banners})
        }),
        getSongMenu().then(res=>{
            this.setData({hotSongMenu:res.playlists})
        }),
        getSongMenu('华语').then(res=>{
            this.setData({recommendSongMenu:res.playlists})
        })
    },
    getPicHeight(){
        debounceQueryRect('.swiper-image').then(res=>{
            this.setData({bannerHeight:res[0].height})
        })},
    handleMoreClick(){
        this.navigateToDetailSongPage('hotRanking')
        },
    handleRankingClick(event){
        const idx=event.currentTarget.dataset.idx
        this.navigateToDetailSongPage(rangkingMap[idx])
        },
    navigateToDetailSongPage(rangkingName){
        wx.navigateTo({
            url: `/pages/detail-songs/index?ranking=${rangkingName}&type=rank`
          })
    },
    handleSongItemClick(event){
        const index=event.currentTarget.dataset.index
        playerStore.setState('playListIndex',index)
        playerStore.setState('playListSongs',this.data.recoomendSongs)
    },
    handlePlayStatusClick(){
        const isPlaying=!this.data.isPlaying
        playerStore.dispatch('handlePlayStatusClick',isPlaying)
        this.setData({playAnimationStatus:isPlaying?'running':'paused'})
    },
    hanldePlayBarClick(){
        wx.navigateTo({
          url: '/pages/music-player/index?id='+this.data.currentSong.id,
        })
    },
     /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.getPageData()
        rankingStore.dispatch('getRankingDataAction')
        rankingStore.onState('hotRanking',(res)=>{
            if (res.tracks){
                const recommendSongs=res.tracks.slice(0,6)
                this.setData({recoomendSongs:recommendSongs})
            }
        })
        rankingStore.onState('newRanking',this.getRankingHandler(0))
        rankingStore.onState('originRanking',this.getRankingHandler(2))
        rankingStore.onState('upRanking',this.getRankingHandler(3))
        playerStore.onState('currentSong',currentSong=>{
            this.setData({currentSong})
        })
        playerStore.onState('isPlaying',isPlaying=>{
            if (isPlaying!==undefined){
                this.setData({isPlaying,playingName:isPlaying?'pause':'play'})
            }
        })
    },
    getRankingHandler:function (idx) {
        return (res)=>{
            if (Object.keys(res).length===0) return 
            const name=res.name
            const coverImgUrl=res.coverImgUrl
            const songList=res.tracks.slice(0,3)
            const playCount=res.playCount
            const rankingObj={name,coverImgUrl,songList,playCount}
            const newRankings={...this.data.rankings,[idx]:rankingObj}
            this.setData({
                rankings:newRankings
            })
        }
    },


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