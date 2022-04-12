// components/header/index.js
Component({
    /**
     * Component properties
     */
    properties: {
        title:{
            type:String,
            value:'默认标题'
        },
        rightText:{
            type:String,
            value:'更多'
        },
        showRight:{
            type:Boolean,
            value:true
        },
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
        handleRightClick(){
            this.triggerEvent('click')
        }
    }
})
