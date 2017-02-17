import React from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity,
         ScrollView, Image } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

const width=Dimensions.get('window').width;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    videoBox:{
        width:width,
        height:360,
        backgroundColor:'#000'
    },
    video:{
        width:width,
        height:360,
        backgroundColor:'#000'
    },
    loading:{
        position:'absolute',
        left:0,
        top:140,
        width:width,
        alignSelf:'center',
        backgroundColor:'transparent'
    },
    progressBox:{
        width:width,
        height:3,
        backgroundColor:'#ccc'
    },
    progressBar:{
        width:1,
        height:3,
        backgroundColor:'#ff6600'
    },
    playIcon:{
        position:'absolute',
        top:140,
        left:width / 2 - 30,
        width:60,
        height:60,
        paddingTop:8,
        paddingLeft:21,
        backgroundColor:'transparent',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:30,
        color:'#ed7b66'
    },
    pauseButton:{
        position:'absolute',
        top:0,
        left:0,
        width:width,
        height:360,
    },
    resumeIcon:{
        position:'absolute',
        top:140,
        left:width / 2 - 30,
        width:60,
        height:60,
        paddingTop:8,
        paddingLeft:21,
        backgroundColor:'transparent',
        borderColor:'#ed7b66',
        borderWidth:1,
        borderRadius:30,
        color:'#ed7b66'
    },
    failText:{
        position:'absolute',
        left:0,
        top:180,
        width:width,
        textAlign:'center',
        color:'#ed7b66',
        backgroundColor:'transparent',
    },
    header:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:width,
        height:64,
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10,
        borderColor:'rgba(0,0,0,0.1)',
        backgroundColor:'#fff',
    },
    backBox:{
        position:'absolute',
        left:12,
        top:32,
        width:50,
        flexDirection:'row',
        alignItems:'center',
    },
    headerTitle:{
        width:width-120,
        textAlign:'center',
    },
    backIcon:{
        color:'#999',
        fontSize:20,
        marginRight:5
    },
    backText:{
        color:'#ed7b66',
        marginBottom:2
    },
    infoBox:{
        width:width,
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10,
    },
    avatar:{
        width:60,
        height:60,
        marginRight:10,
        marginLeft:10,
        borderRadius:30,
    },
    descBox:{
        flex:1
    },
    nickName:{
        fontSize:18,
    },
    title:{
        marginTop:14,
        fontSize:16,
        color:'#666'
    },
}

export default class Detail extends React.Component {

    constructor(props){
        super(props);
        this.state={
            data:this.props.data,
            rate:1,
            muted:true,
            resizeMode:'contain',
            repeat:false,
            videoReady:false,
            videoTotal:0,
            videoCurrent:0,
            videoProgress:0.01,
            playing:false,
            paused:false,
            videoOK:true,

        };

        this.pop=this.pop.bind(this);

        this.onLoadStart=this.onLoadStart.bind(this);
        this.onLoad=this.onLoad.bind(this);
        this.onProgress=this.onProgress.bind(this);
        this.onEnd=this.onEnd.bind(this);
        this.onError=this.onError.bind(this);

        this.rePlay=this.rePlay.bind(this);
        this.paused=this.paused.bind(this);
        this.resume=this.resume.bind(this);
    }

    pop(){
        /*跳转回去的时候有一个bug:
            如果是在列表更新之前点击进入Detail页面，再跳转回去的时，列表为空，此时点击一下屏幕数据会正常显示
            （如果列表数据更新之后进入Detail页面，则正常）
        */
        this.props.navigator.pop()
    }

    onLoadStart(){

    }

    onLoad(){

    }

    onProgress(data){
        let total=data.playableDuration;
        let current=data.currentTime;
        let percent= Number((current/total).toFixed(2));

        let newState={
            videoTotal:total,
            videoCurrent:current,
            videoProgress:percent,
        }

        if(!this.state.videoReady){
            newState.videoReady=true;
        }
        if(!this.state.playing){
            newState.playing=true;
        }

        this.setState(newState);
    }

    onEnd(){

        this.setState({
            videoProgress:1,
            playing:false
        })

    }

    onError(e){
        console.log(e);
        console.log('onError')
    }

    rePlay(){
        this.refs.videoPlayer.seek(0);
    }

    paused(){
        if(!this.state.paused){
            this.setState({
                paused:true,
            })
        }
    }

    resume(){
        if(this.state.paused){
            this.setState({
                paused:false,
            })
        }
    }

    render() {
        let data=this.props.data;

        data.author.avatar=require('./../image/1.jpg'); //由于Rap给出的图片有问题，故用缩略图代替


        let source=require('./../multimedia/vi.mp4');


        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBox}
                                      onPress={this.pop}
                    >
                        <Icon name="ios-arrow-back" style={styles.backIcon}/>
                        <Text style={styles.backText}>
                            返回
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} numberOfLines={1}>视频详情</Text>
                </View>
                <View style={styles.videoBox}>
                    <Video style={styles.video}
                           ref='videoPlayer'
                           source={source}
                           volume={3}
                           paused={this.state.paused}
                           rate={this.state.rate}
                           muted={this.state.muted}
                           resizeMode={this.state.resizeMode}
                           repeat={this.state.repeat}

                           onLoadStart={this.onLoadStart}
                           onLoad={this.onLoad}
                           onProgress={this.onProgress}
                           onEnd={this.onEnd}
                           onError={this.onError}
                    />
                    {
                        !this.state.videoReady && <ActivityIndicator color="#ee735c" style={styles.loading}/>
                    }
                    {
                        this.state.videoReady && !this.state.playing ?
                            <Icon onPress={this.rePlay}
                                  name='ios-play'
                                  style={styles.playIcon}
                                  size={48}
                            /> : null
                    }
                    {
                        this.state.videoReady && this.state.playing ?
                            <TouchableOpacity onPress={this.paused}
                                                style={styles.pauseButton}
                            >
                                {
                                    this.state.paused ?
                                        <Icon onPress={this.resume}
                                              name="ios-play"
                                              style={styles.resumeIcon}
                                              size={48}
                                        /> :
                                        <Text/>
                                }

                            </TouchableOpacity> : null
                    }
                    {
                        !this.state.videoOK &&
                        <Text style={styles.failText}>视频出错了，很抱歉</Text>
                    }
                </View>
                <View style={styles.progressBox}>
                    <View style={[styles.progressBar,{width:width*this.state.videoProgress}]}>
                    </View>
                </View>
                {/*评论滚动区域*/}
                <ScrollView automaticallyAdjustContentInsets={false}
                            enableEmptySections={true}
                            showsVerticalScrollIndicator={false}
                            style={styles.scrollView}
                >
                    <View style={styles.infoBox}>
                        <Image style={styles.avatar} source={data.author.avatar} />
                        <View style={styles.descBox}>
                            <Text style={styles.nickName}>{data.author.nickname}</Text>
                            <Text style={styles.title}>{data.title}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
;























