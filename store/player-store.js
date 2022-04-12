import {HYEventStore} from 'hy-event-store'
import { getSongDetai,getSongLyric } from '../service/api_player'
import {parseLyric,matchLyric} from '../utils/parce-lyric'

// const audioContext=wx.createInnerAudioContext()
const audioContext=wx.getBackgroundAudioManager()
const playerStore=new HYEventStore({
    state:{
        isFirstPlay:true,
        id:0,
        currentSong:{},
        duration:0,
        lyricInfos:[],
        playListSongs:[],
        playListIndex:0,

        currentLyric:'...',
        currentLyricIndex:0,
        currentTime:0,

        playModeIndex:0, //0 循环 1单曲 2随机
        isPlaying:false,
        isStopping:false,

        showPage:false,
    },
    actions:{
        playMusicWithSongAction(ctx,{id,isRefresh=false}){
            if (id!==ctx.id || isRefresh){
                ctx.id=id
                ctx.isPlaying=true
                ctx.currentSong={}
                ctx.duration=0
                ctx.lyricInfos=[]
                ctx.currentLyric='...'
                ctx.currentLyricIndex=0
                ctx.currentTime=0

                getSongDetai(id).then(res=>{
                    ctx.currentSong=res.songs[0]
                    ctx.duration=res.songs[0].dt
                    audioContext.title=res.songs[0].name
                })
                getSongLyric(id).then(res=>{
                    const lyricString=res.lrc.lyric
                    ctx.lyricInfos=parseLyric(lyricString)
                })
                audioContext.stop()
                audioContext.src=`https://music.163.com/song/media/outer/url?id=${id}.mp3`
                // audioContext.title=id
                audioContext.autoplay=true
                if (ctx.isFirstPlay){
                    this.dispatch('setupAudioContextListener')
                    ctx.isFirstPlay=false
                }
            } else {
                this.dispatch('handlePlayStatusClick',true)
            }
        },
        setupAudioContextListener(ctx){
            audioContext.onCanplay(()=>{
                audioContext.play()
            })
            audioContext.onTimeUpdate(()=>{
                const currentTime=audioContext.currentTime*1000
                const matchResult=matchLyric(currentTime,ctx.lyricInfos)
                if (ctx.currentLyricIndex!==matchResult['index']){
                    const currentLyric=matchResult['text']
                    const currentLyricIndex=matchResult['index']
                    ctx.currentLyric=currentLyric
                    ctx.currentLyricIndex=currentLyricIndex
                }
                ctx.currentTime=currentTime
            })
            audioContext.onEnded(()=>{
                this.dispatch('changeMusicAction')
            }),
            audioContext.onPlay(()=>{
                ctx.isPlaying=true
            })
            audioContext.onPause(()=>{
                ctx.isPlaying=false
            })
            audioContext.onStop(()=>{
                ctx.isPlaying=false
                ctx.isStopping=true
            })
        },
        handlePlayStatusClick(ctx,isPlaying){
            ctx.isPlaying=isPlaying
            if (ctx.isPlaying && ctx.isStopping) {
                audioContext.src=`https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
                audioContext.title=ctx.currentSong.name
                audioContext.startTime=ctx.currentTime/1000
                ctx.isStopping=false
            }
            if (isPlaying){
                audioContext.play()
            } else {
                audioContext.pause()
            }
        },
        changeMusicAction(ctx,isNext=true){
            let index=ctx.playListIndex
            const listLength=ctx.playListSongs.length
            const playModeIndex=ctx.playModeIndex
            if (playModeIndex===0){
                index=isNext?index+1:index-1
                if (index===listLength){
                    index=0
                } else if (index===-1){
                    index=listLength-1
                }
            } else if (playModeIndex===1){
                index=index
            } else if (playModeIndex===2){
                let randomIndex=Math.floor(Math.random()*listLength)
                while (index===randomIndex){
                    randomIndex=Math.floor(Math.random()*listLength)
                }
                index=randomIndex  
            }

        const currentSong=ctx.playListSongs[index]
        ctx.playListIndex=index
        this.dispatch('playMusicWithSongAction',{id:currentSong.id,isRefresh:true})
        },
        popUpPlayList(ctx,showPage){
            ctx.showPage=showPage
        }
    }
})

export {
    audioContext,
    playerStore
}