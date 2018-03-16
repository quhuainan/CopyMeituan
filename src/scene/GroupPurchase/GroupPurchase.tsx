import { StyleSheet, Text, View, Image, InteractionManager } from 'react-native'
import * as React from 'react'
import NavigationItem from '../../widget/NavigationItem'
import RefreshListView, { RefreshState } from '../../widget/RefreshListView'
import { recommendUrlWithId } from '../../api'
import GroupPurchaseCell from './GroupPurchaseCell'
import screen from '../../common/screen'
import { Heading2, Heading1, Paragraph, Heading3 } from '../../widget/Text';
import Color from '../../widget/Color';
import Button from '../../widget/Button';
import Separator from '../../widget/Separator';
import SpacingView from '../../widget/SpacingView';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    banner: {
        width: screen.width,
        height: screen.width * 0.5,
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 94,
        height: 36,
        borderRadius: 7,
    },
    tagContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    tipHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: Color.border,
        paddingVertical: 8,
        paddingLeft: 16,
        backgroundColor: 'white'
    }
});

type Props = {
    navigation: any,
}
type State = {
    data: Array<Object>,
    refreshState: number,
}
export default class GroupPurchase extends React.Component<Props, State> {

    static navigationOptions = (({ navigation }: any): any => ({
        title: '团购详情',
        headerStyle: { backgroundColor: 'white' },
        headerRight: (<NavigationItem icon={require('../../img/public/icon_navigation_item_share.png')}
            onPress={() => {

            }} />)
    }))


    constructor(props: any) {
        super(props)
        this.state = {
            data: [],
            refreshState: RefreshState.Idle
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.requestData()
        })
    }


    requestData = async () => {
        try {
            this.setState({ refreshState: RefreshState.HeaderRefreshing })
            let info = this.props.navigation.state.params.info
            let response = await fetch(recommendUrlWithId(info.id))
            let json = await response.json()
            let dataList = json.data.deals.map((info: any) => {
                return {
                    id: info.id,
                    imageUrl: info.imgurl,
                    title: info.brandname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price
                }
            })
            this.setState({
                data: dataList,
                refreshState: RefreshState.NoMoreData
            })
        } catch (error) {
            this.setState({
                refreshState: RefreshState.Failure
            })
        }
    }
    renderItem = ({ item }: any): any => {
        return <GroupPurchaseCell info={item} onPress={() => { this.props.navigation.navigate('GroupPurchase', { info: item }) }} />
    }
    renderHeader = (): any => {
        let info = this.props.navigation.state.params.info
        return (<View>
            <Image style={styles.banner} source={{ uri: info.imageUrl.replace('w.h', '480.0') }} />
            <View style={styles.topContainer}>
                <Heading2 style={{ color: Color.primary }} >￥</Heading2>
                <Heading1 style={{ marginBottom: -8 }}>{info.price}</Heading1>
                <Paragraph style={{ marginLeft: 10 }}>门市价:￥{(info.price * 1.1).toFixed()}</Paragraph>
                <View style={{ flex: 1 }} />
                <Button style={styles.buyButton} title='立即抢购' titleStyle={{ color: 'white', fontSize: 18 }} onPress={() => { }} />
            </View>
            <Separator />
            <View>
                <View style={styles.tagContainer}>
                    <Image style={{ width: 20, height: 20 }} source={require('../../img/home/icon_deal_anytime_refund.png')} />
                    <Paragraph style={{ color: '#89B24F' }}>  随时退</Paragraph>
                    <View style={{ flex: 1 }} />
                    <Paragraph>已售{1234}</Paragraph>
                </View>
            </View>
            <SpacingView />

            <View style={styles.tipHeader}>
                <Heading3>看了本团购的用户还看了</Heading3>
            </View>
        </View >)
    }
    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.data}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderItem}
                    keyExtractor={(item: any, index: number) => { return index }}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={() => this.requestData()} />
            </View>
        );
    }
}