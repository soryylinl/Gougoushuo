import React from 'react';
import {
    StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity,
    ScrollView, Image, ListView, TextInput, Modal, AlertIOS
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import config from './../common/config';
import request from  './../common/request';
import Button from 'react-native-button';

const width = Dimensions.get('window').width;


const replayArr = [
    require('./../image/1.jpg'), require('./../image/2.jpg'), require('./../image/3.jpg')
    , require('./../image/4.jpg'), require('./../image/5.jpg'), require('./../image/6.jpg')
    , require('./../image/7.jpg'), require('./../image/8.jpg'), require('./../image/9.jpg')
    , require('./../image/10.jpg')
]

let cachedResults = {
    items: [],
    total: 0
}

export default class Detail extends React.Component {

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            data: this.props.data,
            rate: 1,
            muted: true,
            resizeMode: 'contain',
            repeat: false,
            videoReady: false,
            videoTotal: 0,
            videoCurrent: 0,
            videoProgress: 0.01,
            playing: false,
            paused: false,
            videoOK: true,
            dataSource: ds.cloneWithRows([]),
            comments: [],
            replayArr: false,

            animationType:'none',
            modalVisible:false,
            content:'',
            isSending:false,
        };

        this.pop = this.pop.bind(this);

        this.onLoadStart = this.onLoadStart.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.onError = this.onError.bind(this);

        this.rePlay = this.rePlay.bind(this);
        this.paused = this.paused.bind(this);
        this.resume = this.resume.bind(this);

        //获取平路数据
        this.fetchData = this.fetchData.bind(this);
        this.renderRow = this.renderRow.bind(this);

        //评论列表加载与刷新
        this.hasMore = this.hasMore.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.focus=this.focus.bind(this);
        this.setModalVisible=this.setModalVisible.bind(this);
        this.blur=this.blur.bind(this);
        this.closeModal=this.closeModal.bind(this);
        this.submit=this.submit.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }
    ;

    componentWillUnmount() {
        cachedResults.total = 0;
        cachedResults.items = [];
    }
    ;


    pop() {
        /*跳转回去的时候有一个bug:
         如果是在列表更新之前点击进入Detail页面，再跳转回去的时，列表为空，此时点击一下屏幕数据会正常显示
         （如果列表数据更新之后进入Detail页面，则正常）
         */
        this.props.navigator.pop()
    }

    onLoadStart() {

    }

    onLoad() {

    }

    onProgress(data) {
        let total = data.playableDuration;
        let current = data.currentTime;
        let percent = Number((current / total).toFixed(2));

        let newState = {
            videoTotal: total,
            videoCurrent: current,
            videoProgress: percent,
        }

        if (!this.state.videoReady) {
            newState.videoReady = true;
        }
        if (!this.state.playing) {
            newState.playing = true;
        }

        this.setState(newState);
    }

    onEnd() {

        this.setState({
            videoProgress: 1,
            playing: false
        })

    }

    onError(e) {
        console.log(e);
        console.log('onError')
    }

    rePlay() {
        this.refs.videoPlayer.seek(0);
    }

    paused() {
        if (!this.state.paused) {
            this.setState({
                paused: true,
            })
        }
    }

    resume() {
        if (this.state.paused) {
            this.setState({
                paused: false,
            })
        }
    }

    renderRow(rowData) {
        let data = rowData;

        return (
            <View key={data.creation} style={styles.replayBox}>
                <Image style={styles.replayAvatar} source={data.replay.avatar}/>
                <View style={styles.replay}>
                    <Text style={styles.replayNickName}>{data.replay.nickname}</Text>
                    <Text style={styles.replayContent}>{data.replay.content}</Text>
                </View>
            </View>
        )
    }

    render() {
        let data = this.props.data;
        data.author.avatar = data.thumb;  //替换缩略图
        let source = require('./../multimedia/vi.mp4');

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

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderFooter={this.renderFooter}
                    onEndReached={this.fetchMoreData}
                    renderHeader={this.renderHeader}
                    onEndReachedThreshold={10}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                    showsVerticalScrollIndicator={false}
                />
                <Modal animationType={'fade'}
                       visible={this.state.modalVisible}
                       onRequestClose={()=>{
                           this.setModalVisible('false')
                       }}
                >
                    <View style={styles.modalContainer}>
                        <Icon onPress={this.closeModal}
                              name="ios-close-outline"
                              style={styles.closeIcon}
                        />
                        <View style={styles.commentBox}>
                            <View style={styles.comment}>
                                <TextInput placeholder="我要说......"
                                           style={styles.content}
                                           multiline={true}
                                           onFocus={this.focus}
                                           onBlur={this.blur}
                                           defaultValue={this.state.content}
                                           onChangeText={(text)=>{
                                               this.setState({
                                                   content:text
                                               })
                                           }}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonBox}>
                            <Button style={styles.submitbtn}
                                    onPress={this.submit}
                            >
                                评论
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    //分页加载处理
    fetchData() {
        this.setState({
            isLoadingTail: true
        })


        request.get(config.api.base + config.api.comment, {
                accessToken: 'ss',
                creation: '123'
            }
        ).then((response) => {
            if (response.success) {
                let result = response.data;

                result.forEach((item, index) => {
                    let remainder = (index + 1) % 10;
                    item.replay.avatar = replayArr[remainder];
                })

                let items = cachedResults.items.slice();  //初始化items

                cachedResults.items = items.concat(result);  //暂存数据
                cachedResults.nextPage += 1;


                cachedResults.total = response.total;  //数据的长度标志

                //设置延时（模拟效果）
                this.timer = setTimeout(() => {
                    this.setState({
                        // 请求结束
                        isLoadingTail: false,
                        dataSource: this.state.dataSource.cloneWithRows(cachedResults.items),
                    })
                }, 2000)

            }
            else return false;
        })
            .catch((error) => {
                this.setState({
                    isLoadingTail: false
                })

                console.error(error);
            });
    }
    ;

    hasMore() {
        return cachedResults.items.length !== cachedResults.total
    }
    ;

    fetchMoreData() {
        //如果有更多的数据或者已经在加载状态
        if (!this.hasMore() || this.state.isLoadingTail) {
            return
        }

        let page = cachedResults.nextPage;

        this.fetchData(page);
    }
    ;

    renderHeader() {
        let data = this.state.data;
        return (
        <View style={styles.listHeader}>
            <View style={styles.infoBox}>
                <Image style={styles.avatar} source={data.author.avatar}/>
                <View style={styles.descBox}>
                    <Text style={styles.nickName}>{data.author.nickname}</Text>
                    <Text style={styles.title}>{data.title}</Text>
                </View>
            </View>
            <View style={styles.commentBox}>
                <View style={styles.comment}>
                    <TextInput placeholder="我要说......"
                               style={styles.content}
                               multiline={true}
                               onFocus={this.focus}
                    />
                </View>
            </View>
            <View style={styles.commentArea}>
                <Text style={styles.commentTitle}>
                    精彩评论
                </Text>
            </View>
        </View>
        )
    }

    renderFooter() {
        if (!this.hasMore() && cachedResults.total !== 0) {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多了</Text>
                </View>
            )
        }

        //在请求发起，但是数据尚未返回的过程中isLoadingTail已经为false，此时任然可以继续下拉记载，避免此情况：在这段时间展示一个空的结点
        if (!this.state.isLoadingTail) {
            return (
                <View style={styles.loadingMore}></View>
            )
        }

        return (
            <ActivityIndicator style={styles.loadingMore}/>
        )
    }
    ;

    //评论
    focus(){
        this.setModalVisible(true);
    }
    ;

    blur(){

    }
    ;

    closeModal(){
        this.setModalVisible(false);
    }
    ;

    setModalVisible(isVisible){
        this.setState({
            modalVisible:isVisible
        })
    }
    ;

    submit(){
        if(!this.state.content){
            return AlertIOS.alert('评论内容不能为空......');
        }

        if(this.state.isSending){
            return AlertIOS.alert('正在评论中......');
        }

        this.setState({
            isSending:true
        },()=>{
            let body={
                accessToken:'ss',
                creation:'123',
                content:this.state.content,
            }

            let url=config.api.base+config.api.comment;

            request.post(url,body).then((response)=>{
                if(response.success){
                    let items=cachedResults.items.slice();
                    let results = [{
                        replay: {
                            nickname: '一蓑烟雨任平生',
                            avatar: require('./../image/27.jpg'),
                            content: this.state.content
                        }
                    }].concat(items);

                    cachedResults.items=results;
                    cachedResults.total++;
                    this.setState({
                        isSending:false,
                        content:'',
                        dataSource:this.state.dataSource.cloneWithRows(cachedResults.items)
                    })

                    this.setModalVisible(false);
                }
            }).catch((err)=>{
                console.log(err);
                this.setState({
                    isSending:false
                })
                this.setModalVisible(false);

                AlertIOS.alert('留言失败，稍后重试......');
            })
        })
    }
    ;

}
;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    videoBox: {
        width: width,
        height: width * 0.56,
        backgroundColor: '#000'
    },
    video: {
        width: width,
        height: width * 0.56,
        backgroundColor: '#000'
    },
    loading: {
        position: 'absolute',
        left: 0,
        top: 80,
        width: width,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    progressBox: {
        width: width,
        height: 3,
        backgroundColor: '#ccc'
    },
    progressBar: {
        width: 1,
        height: 3,
        backgroundColor: '#ff6600'
    },
    playIcon: {
        position: 'absolute',
        top: 90,
        left: width / 2 - 30,
        width: 60,
        height: 60,
        paddingTop: 8,
        paddingLeft: 21,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        color: '#ed7b66'
    },
    pauseButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: 360,
    },
    resumeIcon: {
        position: 'absolute',
        top: 80,
        left: width / 2 - 30,
        width: 60,
        height: 60,
        paddingTop: 8,
        paddingLeft: 21,
        backgroundColor: 'transparent',
        borderColor: '#ed7b66',
        borderWidth: 1,
        borderRadius: 30,
        color: '#ed7b66'
    },
    failText: {
        position: 'absolute',
        left: 0,
        top: 90,
        width: width,
        textAlign: 'center',
        color: '#ed7b66',
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 64,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    backBox: {
        position: 'absolute',
        left: 12,
        top: 32,
        width: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        width: width - 120,
        textAlign: 'center',
    },
    backIcon: {
        color: '#999',
        fontSize: 20,
        marginRight: 5
    },
    backText: {
        color: '#999',
        marginBottom: 2
    },
    infoBox: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 30,
    },
    descBox: {
        flex: 1
    },
    nickName: {
        fontSize: 18,
    },
    title: {
        marginTop: 14,
        fontSize: 16,
        color: '#666'
    },
    replayBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    replayAvatar: {
        height: 40,
        width: 40,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
    },
    replay: {
        flex: 1,
    },
    replayNickName: {
        color: '#666'
    },
    replayContent: {
        color: '#666',
        marginTop: 4,
    },
    loadingMore: {
        marginVertical: 20,
    },
    loadingText: {
        color: '#777',
        textAlign: 'center',
        top:40
    },
    listHeader:{
        marginTop:10,
        width:width,
    },
    commentBox:{
        marginTop:10,
        marginBottom:10,
        padding:8,
        width:width,
    },
    content:{
        paddingLeft:2,
        color:'#333',
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:4,
        fontSize:14,
        height:80,
    },
    commentArea:{
        width:width,
        paddingBottom:6,
        paddingLeft:10,
        paddingRight:10,
    },
    modalContainer:{
        flex:1,
        paddingTop:45,
        backgroundColor:'#fff',
    },
    closeIcon:{
        alignSelf:'center',
        fontSize:30,
        color:'#ee753c'
    },
    submitbtn:{
        width:width-30,
        padding:16,
        marginTop:20,
        marginBottom:20,
        borderWidth:1,
        borderColor:'#ee735c',
        borderRadius:4,
        color:'#ee735c',
        fontSize:18,
        alignSelf:'center'
    },
};























