const timeReg=/\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyricString) {
    const lyricStrings=lyricString.split('\n')
    const lyricInfos=[]
    for (const lineLyric of lyricStrings){
            const timeResult=timeReg.exec(lineLyric)
            if (!timeResult) continue
            const minute=timeResult[1]*60*1000
            const second=timeResult[2]*1000
            const millsecond=parseInt(timeResult[3].padStart(3,'0'))
            const time=parseInt(minute+second+millsecond)
            const text=lineLyric.replace(timeResult[0],'').trim()
            if (!text) continue
            lyricInfos.push({time,text})
    }
    return lyricInfos
}

export function matchLyric(currentTime,lyricInfos) {
    const lyricInfoLength=lyricInfos.length
    for (let i=0;i<lyricInfoLength;i++){
        const iTime=lyricInfos[i]['time']
        if (currentTime<iTime){
            const textResult=i>=1?lyricInfos[i-1]['text']:lyricInfos[0]['text']
            return {text:textResult,index:i>=1?i-1:0}
        }
    }
    return {text:lyricInfos[lyricInfoLength-1]?.text,index:lyricInfoLength-1}
}