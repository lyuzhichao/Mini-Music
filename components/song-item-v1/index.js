// components/song-item-v1/index.js
import {playerStore} from '../../store/index'
Component({
    /**
     * Component properties
     */
    properties: {
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
