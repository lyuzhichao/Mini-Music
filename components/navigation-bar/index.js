// components/navigation-bar/index.js
import {NavigationBarHeight} from '../../constants/device_constant'
Component({
    /**
     * Component properties
     */
    options:{
        multipleSlots:true
    },
    properties: {
        title:{
            type:String,
            value:""
        },
        currentPage:{
            type:Number,
            value:0
        }
    },

    /**
     * Component initial data
     */
    data: {
        statusBarHeight:getApp().globalData.statusBarHeight,
        navigationBarHeight:NavigationBarHeight
    },

    /**
     * Component methods
     */
    methods: {
        handleLeftClick(){
            wx.navigateBack({
              delta: 1,
            })
        }
    },

})
