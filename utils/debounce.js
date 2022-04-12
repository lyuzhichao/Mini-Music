function debounce(fn,delay,immediate=true){
    let timer=null
    let isInvoke=false

    const _debounce=function(...args){
        return new Promise((resolve)=>{
            if (timer) clearTimeout(timer)
            if (immediate && !isInvoke){
                const result=fn.apply(this,args)
                isInvoke=true
                resolve(result)
            } else {
                timer=setTimeout(()=>{
                    const result=fn.apply(this,args)
                    timer=null
                    resolve(result)
                },delay)
            }
        })

    }
    _debounce.cancel=function(){
        if (timer) clearTimeout(timer)
        timer=null
        isInvoke=false
    }
    return _debounce
}
module.exports={
    debounce:debounce
}