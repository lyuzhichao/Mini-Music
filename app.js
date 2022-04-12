// app.js
App({
    globalData:{
        screenWidth:0,
        screenHeight:0,
        statusBarHeight:0
    },
    onLaunch:function(){
        const info=wx.getSystemInfoSync()
        this.globalData.screenWidth=info.screenWidth
        this.globalData.screenHeight=info.screenHeight
        this.globalData.statusBarHeight=info.statusBarHeight
    }
})
