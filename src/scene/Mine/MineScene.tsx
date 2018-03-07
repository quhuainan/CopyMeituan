import { StyleSheet, Text, View, ScrollView, RefreshControl, Image } from 'react-native';
import * as React from 'react'
import Color from '../../widget/Color';
import NavigationItem from '../../widget/NavigationItem';
import screen from '../../common/screen'
import SpacingView from '../../widget/SpacingView';
import { Heading2, Paragraph } from '../../widget/Text';
import DetailCell from '../../widget/DetailCell';
type State = {
    isRefreshing: boolean
}

export default class MineScene extends React.Component<any, State> {

    static navigationOptions = ({ navigations }: any) => ({
        headerRight: (<View style={{ flexDirection: 'row' }}>
            <NavigationItem icon={require('../../img/mine/icon_navigation_item_set_white.png')} onPress={() => { }} />
            <NavigationItem icon={require('../../img/mine/icon_navigation_item_message_white.png')} onPress={() => { }} />
        </View>),
        headerStyle: { backgroundColor: Color.primary, elevation: 0, borderBottomWidth: 0, },
    })

    constructor(props: any) {
        super(props)
        this.state = {
            isRefreshing: false
        }
    }

    onHeaderRefresh = (): any => {
        this.setState({ isRefreshing: true })
        setTimeout(() => { this.setState({isRefreshing:false})}, 2000)
    }

    renderHeader(): any {
        return (<View style={styles.header}>
            <Image style={styles.avatar} source={require('../../img/mine/avatar.png')} />
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Heading2 style={{ color: 'white' }}>屈淮南</Heading2>
                    <Image style={{ marginLeft: 8 }} source={require('../../img/mine/beauty_technician_v15.png')} />
                </View>
                <Paragraph style={{ color: 'white', marginTop: 4 }}>个人信息 ></Paragraph>
            </View>
        </View>)
    }

    renderCells(): any {
        let cells = []
        let datalist = this.getDataList()
        for (let i = 0; i < datalist.length; i++) {
            let subtitle = datalist[i]
            for (let j = 0; j < subtitle.length; j++) {
                let data = subtitle[j]
                let cell = <DetailCell image={data.image} subtitle={data.subtitle} key={data.title} title={data.title} />
                cells.push(cell)
            }
            cells.push(<SpacingView key={i} />)
        }
        return <View style={{ flex: 1 }}>{cells}</View>
    }

    getDataList(): any {
        return (
            [
                [
                    { title: '我的钱包', subtitle: '办信用卡', image: require('../../img/mine/icon_mine_wallet.png') },
                    { title: '余额', subtitle: '￥95872385', image: require('../../img/mine/icon_mine_balance.png') },
                    { title: '抵用券', subtitle: '63', image: require('../../img/mine/icon_mine_voucher.png') },
                    { title: '会员卡', subtitle: '2', image: require('../../img/mine/icon_mine_membercard.png') }
                ],
                [
                    { title: '好友去哪', image: require('../../img/mine/icon_mine_friends.png') },
                    { title: '我的评价', image: require('../../img/mine/icon_mine_comment.png') },
                    { title: '我的收藏', image: require('../../img/mine/icon_mine_collection.png') },
                    { title: '会员中心', subtitle: 'v15', image: require('../../img/mine/icon_mine_membercenter.png') },
                    { title: '积分商城', subtitle: '好礼已上线', image: require('../../img/mine/icon_mine_member.png') }
                ],
                [
                    { title: '客服中心', image: require('../../img/mine/icon_mine_customerService.png') },
                    { title: '关于美团', subtitle: '我要合作', image: require('../../img/mine/icon_mine_aboutmeituan.png') }
                ]
            ]
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Color.paper }}>
                <View style={{ position: 'absolute', width: screen.width, height: screen.height / 2, backgroundColor: Color.primary }}></View>
                <ScrollView>
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this.onHeaderRefresh()}
                        tintColor='gray' />
                    {this.renderHeader()}
                    <SpacingView />
                    {this.renderCells()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.primary,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51D3C6'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold'
    }
})