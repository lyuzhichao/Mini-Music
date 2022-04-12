// pages/music-player/index.js
import {playerStore} from '../../store/index'
import {NavigationBarHeight} from '../../constants/device_constant'
import {audioContext} from '../../store/index'
import {matchLyric} from '../../utils/parce-lyric'

const playModeNames=['order','repeat','random']
Page({

    /**
     * Page initial data
     */
    data: {
        currentSong:{},
        duration:0,
        lyricInfos:[],
        playListSongs:[],
        playListIndex:0,

        currentLyric:'...',
        currentLyricIndex:0,
        currentTime:0,

        currentPage:0,
        contentHeight:0,
        isMusicLyric:true,
        sliderValue:0,
        isSliderChanging:false,
        lyricScrollTop:0,

        payModeIndex:0,
        playModeName:'order',

        isPlaying:false,
        playingName:'pause',
        showPage:false
    },
    handleTitleClick(event){
        const currentPage=event.currentTarget.dataset.index
        this.setData({currentPage})
    },
    handlePlayModeClick(){
        let playModeIndex=this.data.playModeIndex+1
        if (playModeIndex===3){
            playModeIndex=0
        }
        playerStore.setState('playModeIndex',playModeIndex)

    },
    handleSwiperChange(event){
        const current=event.detail.current
        this.setData({currentPage:current})
    },
    handleSliderChange(event){
            const value=event.detail.value
            const currentTime=this.data.duration*value/100

            const matchResult=matchLyric(currentTime,this.data.lyricInfos)
            if (this.data.currentLyricIndex!==matchResult['index']){
                const currentLyric=matchResult['text']
                const currentLyricIndex=matchResult['index']
                const lyricScrollTop=currentLyricIndex*35
                this.setData({lyricScrollTop})
                playerStore.setState('currentLyric',currentLyric)
                playerStore.setState('currentLyricIndex',currentLyricIndex)
            }
            // audioContext.pause()
            audioContext.seek(currentTime/1000)
            setTimeout(() => {
                audioContext.play()
            }, 500);
            this.setData({sliderValue:value,isSliderChanging:false})
            playerStore.setState('currentTime',currentTime)
    },
    handleSliderChanging(event){
        const value=event.detail.value
        const currentTime=this.data.duration*value/100
        this.setData({isSliderChanging:true})
        playerStore.setState('currentTime',currentTime)
    },
    handlePlayStatusClick(){
        const isPlaying=!this.data.isPlaying
        playerStore.dispatch('handlePlayStatusClick',isPlaying)
    },
    handlePreClick(){
        playerStore.dispatch('changeMusicAction',false)
    },
    handleNextClick(){ 
        playerStore.dispatch('changeMusicAction',true)
    },
    handlePlayListClick(){
        playerStore.dispatch('popUpPlayList',!this.data.showPage)
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        this.setupPlayerStoreListener()
        const globalData=getApp().globalData
        const screenHeight=globalData.screenHeight
        const screenWidth=globalData.screenWidth
        const statusBarHeight=globalData.statusBarHeight
        const contentHeight=screenHeight-statusBarHeight-NavigationBarHeight
        this.setData({contentHeight})
        this.setData({isMusicLyric:screenHeight/screenWidth>=2?true:false})

    },
    setupPlayerStoreListener(){
        playerStore.onStates(
            ['currentSong','duration','lyricInfos'],
            ({currentSong,duration,lyricInfos})=>{
            if (currentSong) this.setData({currentSong})
            if (duration) this.setData({duration})
            if (lyricInfos) this.setData({lyricInfos})
        })
        playerStore.onStates(
            ['currentLyric','currentLyricIndex','currentTime'],
            ({currentLyric,currentLyricIndex,currentTime})=>{
            if (currentLyric) this.setData({currentLyric})

            if (currentLyricIndex) {
                const lyricScrollTop=currentLyricIndex*35
                this.setData({currentLyricIndex,lyricScrollTop})
            }

            if (currentTime && !this.data.isSliderChanging){
                const sliderValue=parseInt(currentTime*100/this.data.duration)
                this.setData({currentTime,sliderValue})
            }
        }
        )
        playerStore.onState('playModeIndex',(playModeIndex)=>{
            if (playModeIndex!==undefined){
                this.setData({playModeIndex:playModeIndex,playModeName:playModeNames[playModeIndex]})
            }
        })
        playerStore.onState('isPlaying',isPlaying=>{
            if (isPlaying!==undefined){
                this.setData({isPlaying,playingName:isPlaying?'pause':'resume'})
            }
        })
        playerStore.onState('showPage',(showPage)=>{
            if (showPage!==undefined){
                this.setData({showPage})
            }
        })  
    }

})