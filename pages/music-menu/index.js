// pages/music-menu/index.js
import {getSongMenu} from '../../service/api_music'
Page({

    /**
     * Page initial data
     */
    data: {
        musicPlaylist:[],
        title:''
    },

    /**
     * Lifecycle function--Called when page load
     */
    songMenuItemClcik(event){
        const item=event.currentTarget.dataset.item
        wx.navigateTo({
          url: `/pages/detail-songs/index?menuID=${item.id}&type=menu`,
        })
    },
    onLoad(options) {
        const menuType=options.menuType
        const title=options.title
        this.setData({title})
        getSongMenu(menuType,48).then(res=>{
            this.setData({musicPlaylist:res.playlists})
        }
        )
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow() {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {

    }
})