// pages/detail-video/index.js
import { getVideoURL,getVideoDetail, getVideoRelated } from "../../service/api_video";
Page({

    /**
     * Page initial data
     */
    data: {
        mvURLInfo:{},
        mvDetail:{},
        relatedMVs:{}
    },

    /**
     * Lifecycle function--Called when page load
     */
    getPageData(id){
        //请求播放地址
        getVideoURL(id).then(res=>{
            this.setData({mvURLInfo:res.data})
        })
        //请求视频信息
        getVideoDetail(id).then(res=>{
            this.setData({mvDetail:res.data})
        })
        //请求相关视频
        getVideoRelated(id).then(res=>{
            console.log(res.data);
            this.setData({relatedMVs:res.data})
        })
    },

    onLoad: function (options) {
        const id=options.id
        this.getPageData(id)
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