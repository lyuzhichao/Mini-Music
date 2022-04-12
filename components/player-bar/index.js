// components/player-bar/index.js
import {playerStore} from '../../store/index'
Component({
    /**
     * Component properties
     */
    properties: {

    },

    /**
     * Component initial data
     */
    data: {
        currentSong:{},
        isPlaying:false,
        playingName:'pause',
        playAnimationStatus:'running',
        showPage:false
    },

    /**
     * Component methods
     */
    lifetimes:{
        ready:function (params) {
            playerStore.onState('currentSong',currentSong=>{
                this.setData({currentSong})
            })
            playerStore.onState('isPlaying',isPlaying=>{
                if (isPlaying!==undefined){
                    this.setData({isPlaying,playingName:isPlaying?'pause':'play',playAnimationStatus:isPlaying?'running':'paused'})
                }
            })
            playerStore.onState('showPage',(showPage)=>{
                if (showPage!==undefined){
                    this.setData({showPage})
                }
            })  
            
        }
    },
    methods: {
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
        handlePlayListClick(){
            playerStore.dispatch('popUpPlayList',!this.data.showPage)
        }
    }
})
