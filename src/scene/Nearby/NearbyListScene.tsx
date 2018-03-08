import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'
import RefreshListView, { RefreshState } from '../../widget/RefreshListView';
import api from '../../api';
import NearbyHeaderView from './NearbyHeaderView';
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

type Props = {
    types: Array<string>
    navigation: any,
}
type State = {
    typeIndex: number,
    data: Array<Object>,
    refreshState: number,
}
export default class NearbyListScene extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            typeIndex: 0,
            data: [],
            refreshState: RefreshState.Idle
        }
    }

    componentDidMount() {
        this.requestFirstPage()
    }

    requestData = async () => {
        let response = await fetch(api.recommend)
        let json = await response.json()

        let dataList = json.data.map((info: any) => {
            return {
                id: info.id,
                imageUrl: info.squareimgurl,
                title: info.mname,
                subtitle: `[${info.range}]${info.title}`,
                price: info.price
            }
        })
        dataList.sort(() => { return 0.5 - Math.random() })
        return dataList
    }
    renderHeader = (): any => {
        console.log('我被渲染2')
        return <NearbyHeaderView titles={this.props.types}
            selectedIndex={this.state.typeIndex} onSelected={(index: number) => {
                console.log('选中的值2222', index, this.state.typeIndex)

                if (index != this.state.typeIndex) {
                    console.log('选中的值3333')

                    this.setState({ typeIndex: index })
                    this.requestData()
                }
            }}>
        </NearbyHeaderView>
    }

    renderItem = ({ item }: any) => {
        return (<GroupPurchaseCell info={item} onPress={() => { this.props.navigation.navigate('GroupPurchase', { info: item }) }} />)
    }
    requestFirstPage = async () => {
        try {
            this.setState({ refreshState: RefreshState.HeaderRefreshing })
            let dataList = await this.requestData()
            this.setState({
                data: dataList,
                refreshState: RefreshState.Idle,
            })
        } catch (error) {
            this.setState({
                refreshState: RefreshState.Failure
            })
        }
    }
    requestNextPage = async () => {
        try {
            this.setState({ refreshState: RefreshState.FooterRefreshing })
            let dataList = await this.requestData()

            this.setState({ data: [...this.state.data, ...dataList], refreshState: this.state.data.length > 30 ? RefreshState.NoMoreData : RefreshState.Idle })
        } catch (error) {
            this.setState({ refreshState: RefreshState.Failure })
        }
    }
    render() {
        console.log('我被渲染1')

        return (
            <RefreshListView
                data={this.state.data}
                ListHeaderComponent={this.renderHeader}
                renderItem={this.renderItem}
                keyExtractor={(item: any, index: number) => index}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.requestFirstPage}
                onFooterRefresh={this.requestNextPage}
            />
        );
    }
}