// components/play-list/index.js
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
        playListSongs:[],
        playListIndex:0,
        currentSong:{},
        isShowPlayList:false,
        showPage:false,
        isOnShowPage:false,
        playListScrollTop:0
    },
    lifetimes:{
        ready:function (params) {
            playerStore.onState('playListSongs',(playListSongs)=>{
                if (playListSongs){
                    this.setData({playListSongs})
                }
            })
            playerStore.onState('playListIndex',(playListIndex)=>{

                if (playListIndex!==undefined){
                    this.setData({playListIndex})
                } 
            })
            playerStore.onState('currentSong',(currentSong)=>{
                if (currentSong){
                    this.setData({currentSong})
                }
            })

            playerStore.onState('showPage',(showPage)=>{
                if (showPage!==undefined){
                    this.setData({showPage})
                }
            })
        },
    },

    /**
     * Component methods
     */
    methods: {
        handlePageExit(){
            playerStore.dispatch('popUpPlayList',false)
        },
        handleItemClick(event){
            const playListIndex=event.currentTarget.dataset.index
            const id=event.currentTarget.dataset.item.id
            playerStore.dispatch('playMusicWithSongAction',{id})
            playerStore.setState('playListIndex',playListIndex)
            
        },
        handleScrollTop(){
            this.setData({playListScrollTop:36*(this.data.playListIndex-6>=0?this.data.playListIndex-3:0)})
        }
    }
})
