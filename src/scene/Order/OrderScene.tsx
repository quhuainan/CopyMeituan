import { StyleSheet, Text, View, StatusBar } from 'react-native';
import * as React from 'react'
import RefreshListView, { RefreshState } from '../../widget/RefreshListView'
import DetailCell from '../../widget/DetailCell';
import OrderMenuItem from './OrderMenuItem';
import SpacingView from '../../widget/SpacingView';
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell';
import api from '../../api';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    itemContainer: {
        flexDirection: 'row'
    },
});

export default class OrderScene extends React.Component<any, any> {

    static navigationOptions = ({ navigation }: any) => ({
        title: '订单',
        headerStyle: { backgroundColor: 'white' },
    })

    constructor(props: any) {
        super(props)
        this.state = { data: [], refreshState: RefreshState.Idle }
    }

    componentDidMount() {
        this.requestData()
    }
    renderHeader = () => {
        return (<View style={styles.container}>
            <DetailCell title='我的订单' subtitle='全部订单' style={{ height: 38 }} />
            <View style={styles.itemContainer}>
                <OrderMenuItem title='待付款' icon={require('../../img/order/order_tab_need_pay.png')} />
                <OrderMenuItem title='待使用' icon={require('../../img/order/order_tab_need_use.png')} />
                <OrderMenuItem title='待评价' icon={require('../../img/order/order_tab_need_review.png')} />
                <OrderMenuItem title='退款/售后' icon={require('../../img/order/order_tab_needoffer_aftersale.png')} />
            </View>
            <SpacingView />>
            <DetailCell title='我的收藏' subtitle='查看全部' style={{ height: 38 }} />
        </View>)
    }
    renderCell = ({ item }: any) => {
        return (<GroupPurchaseCell info={item} onPress={() => {
            StatusBar.setBarStyle('default', false)
            this.props.navigation.navigate('GroupPurchase', { info: item })
        }} />)
    }

    requestData = async () => {
        try {
            this.setState({ refreshState: RefreshState.HeaderRefreshing })
            let response = await fetch(api.recommend)
            let json = await response.json()
            let dataList = json.data.map((info: any) => {
                return {
                    id: info.id,
                    imageUrl: info.squareimgurl,
                    title: info.mname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price,
                }
            })
            console.log('订单数据', dataList)
            dataList.sort(() => { return 0.5 - Math.random() })
            this.setState({ data: dataList, refreshState: RefreshState.NoMoreData })
        } catch (error) {
            this.setState({
                refreshState: RefreshState.Failure,
            })
        }
    }
    render() {
        return (<View style={styles.container}>
            <RefreshListView data={this.state.data}
                ListHeaderComponent={this.renderHeader}
                renderItem={this.renderCell}
                keyExtractor={(item: any) => { return item.id }}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.requestData}>
            </RefreshListView>
        </View>
        );
    }
}