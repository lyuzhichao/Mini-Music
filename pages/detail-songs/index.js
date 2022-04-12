// pages/detail-songs/index.js
import {rankingStore,playerStore} from "../../store/index"
import {getMenuDetail} from '../../service/api_music'
Page({

    /**
     * Page initial data
     */
    data: {
        rankingName:'',
        songInfo:{},
        type:'',
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        const type=options.type
        this.setData({type:type})
        if (type=='rank'){
            const ranking=options.ranking
            this.setData({rankingName:ranking})
            rankingStore.onState(ranking,this.getRankingData)
        } else if (type==='menu'){
            const id=options.menuID
            getMenuDetail(id).then(res=>{
                this.setData({songInfo:res.playlist})
            })
        }


    },
    getRankingData(res){
       this.setData({songInfo:res})
    },
    handleSongItemClick(event){
        const index=event.currentTarget.dataset.index
        playerStore.setState('playListIndex',index)
        playerStore.setState('playListSongs',this.data.songInfo.tracks)
    },
    onUnload:function () {
        if (this.data.type==='rank'){
            rankingStore.offState(this.data.rankingName,this.getRankingData)
        }
    }
})