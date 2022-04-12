// components/song-item-v2/index.js
import {playerStore} from '../../store/index'
Component({
    /**
     * Component properties
     */
    properties: {
        index:{
            type:Number,
            value:0
        },
        item:{
            type:Object,
            value:{}
        }
    },

    /**
     * Component initial data
     */
    data: {

    },

    /**
     * Component methods
     */
    methods: {
        handleSongItemClick(){
            const id=this.properties.item.id
            wx.navigateTo({
              url: '/pages/music-player/index?id='+id,
            })
            playerStore.dispatch('playMusicWithSongAction',{id})
        }
    }
})
