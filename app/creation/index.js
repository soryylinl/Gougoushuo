import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, Image,
    Dimensions, ActivityIndicator, RefreshControl, AlertIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import request from './../common/request';
import config from './../common/config';
import Detail from './detail';

const width=Dimensions.get('window').width;

const initData=[
    {
        "id": "64000019930503144X",
        "thumb": require('./../image/1.jpg'),
        "title": "我的面包故事",
        "video": "http://www.w3school.com.cn/i/movie.ogg"
    },
    {
        "id": "710000198302267821",
        "thumb": require('./../image/2.jpg'),
        "title": "我的面包故事",
        "video": "http://www.w3school.com.cn/i/movie.ogg"
    },
    {
        "id": "340000200312248406",
        "thumb": require('./../image/3.jpg'),
        "title": "我的面包故事",
        "video": "http://www.w3school.com.cn/i/movie.ogg"
    },
    {
        "id": "420000197210318608",
        "thumb": require('./../image/4.jpg'),
        "title": "我的面包故事",
        "video": "http://www.w3school.com.cn/i/movie.ogg"
    },
    {
        "id": "650000199702087297",
        "thumb": require('./../image/5.jpg'),
        "title": "我的面包故事",
        "video": "http://www.w3school.com.cn/i/movie.ogg"
    },
    {
        "id": "150000197111146729",
        "thumb": require('./../image/6.jpg'),
        "title": "我的面包故事",
        "video": "http://www.w3school.com.cn/i/movie.ogg"
    },
    {
        "id": "460000200804133856",
        "thumb": require('./../image/7.jpg'),
        "title": "我的面包故事",
        "video": "http://www.w3school.com.cn/i/movie.ogg"
    },
    {
        "id": "330000199607270320",
        "thumb": require('./../image/8.jpg'),
        "title": "我的面包故事",
        "video": "http://www.w3school.com.cn/i/movie.ogg"
    },
    {
        "id": "540000198607215377",
        "thumb": require('./../image/9.jpg'),
        "title": "我的面包故事",
        "video": "http://www.w3school.com.cn/i/movie.ogg"
    },
    {
        "id": "630000198812012327",
        "thumb": require('./../image/10.jpg'),
        "title": "我的面包故事",
        "video": "http://www.w3school.com.cn/i/movie.ogg"
    }
]

const loadingData=[
            {thumb:require('./../image/11.jpg'),title:'2017从心启程，挪威的森林'},{thumb:require('./../image/12.jpg'),title:'我们终究会牵手旅行'},{thumb:require('./../image/13.jpg'),title:'豳风，七月流火'}
            ,{thumb:require('./../image/14.jpg'),title:'醉美南疆行'},{thumb:require('./../image/15.jpg'),title:'一起到世界的尽头，一般古朴一般清新'},{thumb:require('./../image/16.jpg'),title:'拥抱天空之城，天空之镜'}
            ,{thumb:require('./../image/17.jpg'),title:'埃塞俄比亚之旅人文篇'},{thumb:require('./../image/18.jpg'),title:'秋天一定要住在北平'},{thumb:require('./../image/19.jpg'),title:'青春与步伐都不停歇，北国风光'}
            ,{thumb:require('./../image/20.jpg'),title:'冬日暖阳初访霓虹国'}
            ]

const refreshData=[
    {thumb:require('./../image/1.jpg'),title:'青春与步伐都不停歇，北国风光'},{thumb:require('./../image/2.jpg'),title:'醉美南疆行'},{thumb:require('./../image/3.jpg'),title:'秋天一定要住在北平'}
    ,{thumb:require('./../image/4.jpg'),title:'2017从心启程，挪威的森林'},{thumb:require('./../image/5.jpg'),title:'一起到世界的尽头，一般古朴一般清新'},{thumb:require('./../image/6.jpg'),title:'拥抱天空之城，天空之镜'}
    ,{thumb:require('./../image/7.jpg'),title:'埃塞俄比亚之旅人文篇'},{thumb:require('./../image/8.jpg'),title:'我们终究会牵手旅行'},{thumb:require('./../image/9.jpg'),title:'豳风，七月流火'}
    ,{thumb:require('./../image/10.jpg'),title:'冬日暖阳初访霓虹国'}
]

let cachedResults={
    nextPage:1,
    items:[],
    total:0
}


//将list组件化
class Item extends React.Component{

    constructor(props){
        super(props);
        let rowData=this.props.rowData;
        this.state={
            rowData:rowData,
            up:rowData.voted,
        }

        this.up=this.up.bind(this);
    }

    up() {
        let rowData = this.state.rowData;
        let up = !this.state.up;  //传入的状态
        let params = {
            id: rowData.id,
            accessToken: 'ss',
            up: up ? '1' : '0'
        }

        let url = config.api.base + config.api.up;

        request.post(url, params)
            .then((data) => {
                if (data && data.success) {
                    this.setState({
                        up: up
                    })
                }
                else {
                    AlertIOS.alert('点赞失败，稍后重试......');
                }
            })
            .catch((err)=>{
                console.log(err);
                AlertIOS.alert('点赞失败，稍后重试......');
            })
    }

    render(){
        return (
            <TouchableHighlight onPress={this.props.onSelect}>
                <View style={styles.item}>
                    <Text style={styles.title}>{this.state.rowData.title}</Text>
                    <Image source={this.state.rowData.thumb} style={styles.thumb}>
                        <Icon name="ios-play" size={28} style={styles.play}/>
                    </Image>
                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Icon name={this.state.up?"ios-heart":"ios-heart-outline"}
                                  size={28}
                                  style={[styles.up,this.state.up?null:styles.down]}
                                  onPress={this.up}
                            />
                            <Text style={styles.handleText} onPress={this.up}>喜欢</Text>
                        </View>
                        <View style={styles.handleBox}>
                            <Icon name="ios-alarm-outline" size={28} style={styles.commentIcon}/>
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

export default class List extends React.Component {

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged : (r1,r2)=>r1!==r2});
        this.state={
            dataSource:ds.cloneWithRows(initData),
            isLoadingTail:false,
            isRefreshing:false
        }

        this.renderRow=this.renderRow.bind(this);
        this.fetchData=this.fetchData.bind(this);
        this.hasMore=this.hasMore.bind(this);
        this.fetchMoreData=this.fetchMoreData.bind(this);
        this.renderFooter=this.renderFooter.bind(this);
        this.onRefresh=this.onRefresh.bind(this);
        this.loadPage=this.loadPage.bind(this);
    }

    renderRow(rowData){
        return (
            <Item key={rowData.id} onSelect={()=>this.loadPage(rowData)} rowData={rowData}/>
        )
    }

    componentDidMount(){
        this.fetchData(1);
    }

    fetchData(page){
        if(page!==0){
            this.setState({
                isLoadingTail:true
            })
        }
        else{
            this.setState({
                isRefreshing:true
            })
        }

        request.get(config.api.base + config.api.creations, {
                accessToken: 'ss',
                page:page
            }
        ).then((response)=>{
                if(response.success){
                    let result=response.data;
                    let newDate;
                    if(page!==0){
                        newDate=loadingData;
                    }
                    else{
                        newDate=refreshData;
                    }

                    result.forEach((item,index)=>{
                        let remainder=(index+1)%10;
                        item.thumb=newDate[remainder].thumb;
                        item.title=newDate[remainder].title;
                    })

                    let items=cachedResults.items.slice();  //初始化items

                    if(page!==0){
                        cachedResults.items=items.concat(result);  //暂存数据
                        cachedResults.nextPage+=1;
                    }
                    else{
                        cachedResults.items=result.concat(items);
                    }

                    cachedResults.total=response.total;  //数据的长度标志

                    if(page!==0){
                        //设置延时（模拟效果）
                        this.timer=setTimeout(()=>{
                            this.setState({
                                // 请求结束
                                isLoadingTail:false,
                                dataSource:this.state.dataSource.cloneWithRows(cachedResults.items)
                            })
                        },2000)
                    }
                    else{
                        this.setState({
                            // 请求结束
                            isRefreshing:false,
                            dataSource:this.state.dataSource.cloneWithRows(cachedResults.items)
                        })
                    }

                }
                else return false;
            })
            .catch((error) => {
                if(page!==0){
                    this.setState({
                        isLoadingTail:false
                    })
                }
                else{
                    this.setState({
                        isRefreshing:false
                    })
                }

                console.error(error);
            });
    }

    fetchMoreData(){
        //如果有更多的数据或者已经在加载状态
        if(!this.hasMore()||this.state.isLoadingTail){
            return
        }

        let page=cachedResults.nextPage;

        this.fetchData(page);
    }

    hasMore(){
        return cachedResults.items.length!== cachedResults.total
    }

    //提示加载信息
    renderFooter(){
        if(!this.hasMore()&&cachedResults.total!==0){
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多了</Text>
                </View>
            )
        }

        //在请求发起，但是数据尚未返回的过程中isLoadingTail已经为false，此时任然可以继续下拉记载，避免此情况：在这段时间展示一个空的结点
        if(!this.state.isLoadingTail){
            return (
                <View style={styles.loadingMore}></View>
            )
        }

        return (
            <ActivityIndicator style={styles.loadingMore}/>
        )
    }

    onRefresh(){
        if(!this.hasMore()||this.state.isRefreshing){
            return
        }

        this.fetchData(0);
    }

    loadPage(rowData){
        this.props.navigator.push({
            name:'detail',
            component:Detail,
            params:{
                data:rowData
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        列表页面
                    </Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                    showsVerticalScrollIndicator={false}
                    onEndReached={this.fetchMoreData}
                    onEndReachedThreshold={20}
                    renderFooter={this.renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
                            title='拼命加载中...'
                            titleColor="#ff6600"
                        />
                    }
                />
            </View>
        )
    }
}
;

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    header:{
        paddingTop:25,
        paddingBottom:12,
        backgroundColor:'#ee735c'
    },
    headerTitle:{
        color:'#fff',
        fontSize:16,
        textAlign:'center',
        fontWeight:'600'
    },
    item:{
        width:width,
        marginBottom:10,
        backgroundColor:'#fff'
    },
    thumb:{
        width:width,
        height:width*0.56,
        resizeMode:'cover',
    },
    title:{
        padding:10,
        fontSize:18,
        color:'#333'
    },
    itemFooter:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#eee'
    },
    handleBox:{
        padding:10,
        flexDirection:'row',
        width:width/2-0.5,
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    play:{
        position:'absolute',
        bottom:14,
        right:14,
        width:46,
        height:46,
        paddingTop:9,
        paddingLeft:18,
        backgroundColor:'transparent',
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:23,
        color:'#ed7b66'
    },
    handleText:{
        paddingLeft:12,
        fontSize:18,
        color:'#333'
    },
    up:{
        fontSize:22,
        color:'#ed7b66'
    },
    down:{
        fontSize:22,
        color:'#333'
    },
    commentIcon:{
        fontSize:22,
        color:'#333'
    },
    loadingMore:{
        marginVertical:20
    },
    loadingText:{
        color:'#777',
        textAlign:'center'
    }

}