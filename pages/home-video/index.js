// pages/home-video/index.js
import {getTopMV} from "../../service/api_video";
Page({

    /**
     * Page initial data
     */
    data: {
        topMV:[],
        hasMore:true
    },

    async getTopMvData(offset){
        if (this.data.hasMore){
            wx.showNavigationBarLoading();
            const res = await getTopMV(offset)
            let newData=this.data.topMV
            if (offset===0){
                newData=res.data
            } else {
                newData=newData.concat(res.data)
                this.setData({hasMore:res.hasMore})
            }
            this.setData({topMV:newData})
            wx.hideNavigationBarLoading();
        } else {
            return
        }


    },
    handleVideoItemClick(event){
        const id=event.currentTarget.dataset.item.id
        wx.navigateTo({
          url: '/pages/detail-video/index?id='+id,
        })
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.getTopMvData(0)
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
        this.getTopMvData(0)
    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {
        if (this.data.hasMore){
            this.getTopMvData(this.data.topMV.length)
        } else {
            return
        }

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})