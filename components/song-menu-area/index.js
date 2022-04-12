// components/song-menu-area/index.js
// const app=getApp()
Component({
    /**
     * Component properties
     */
    properties: {
        songMenu:{
            type:Array,
            value:[]
        },
        title:{
            type:String,
            value:'默认歌单'
        },
        menuType:{
            type:String,
            value:''
        }
    },

    /**
     * Component initial data
     */
    data: {
        // screenWidth=app.globalData.screenWidth
    },

    /**
     * Component methods
     */
    methods: {
        songMenuItemClcik(event){
            const item=event.currentTarget.dataset.item
            wx.navigateTo({
              url: `/pages/detail-songs/index?menuID=${item.id}&type=menu`,
            })
        },
        handleMoreClick(){
            wx.navigateTo({
              url: '/pages/music-menu/index?menuType='+this.properties.menuType+'&title='+this.properties.title,
            })
        }
    }
})
