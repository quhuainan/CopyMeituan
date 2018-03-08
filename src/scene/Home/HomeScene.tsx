import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import * as React from 'react'
import Color from '../../widget/Color';
import { Paragraph, Heading3 } from '../../widget/Text';
import screen from '../../common/screen'
import NavigationItem from '../../widget/NavigationItem'
import api from '../../api'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import HomeMenuView from './HomeMenuView';
import SpacingView from '../../widget/SpacingView';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Color.paper
  },
  searchIcon: {
    width: 20,
    height: 20,
    margin: 5
  },
  searchBar: {
    width: screen.width * 0.7,
    height: 30,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  recommendHeader: {
    height: 35,
    justifyContent: 'center',
    borderWidth: screen.onePixel,
    borderColor: Color.border,
    paddingVertical: 8,
    paddingLeft: 20,
    backgroundColor: 'white'
  },
});

type Props = {
  navigation: any,
}
type State = {
  discounts: Array<Object>
  dataList: Array<Object>
  refreshing: boolean,
}

export default class HomeScene extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: (<TouchableOpacity style={styles.searchBar}>
      <Image style={styles.searchIcon} source={require("../../img/home/search_icon.png")} />
      <Paragraph>一点点</Paragraph>
    </TouchableOpacity>),
    headerRight: (<NavigationItem
      icon={require('../../img/mine/icon_navigation_item_message_white.png')}

    />),
    headerLeft: (<NavigationItem
      title='福州'
      titleStyle={{ color: 'white' }} />),
    headerStyle: { backgroundColor: Color.primary }
  })

  constructor(prpos: Props) {
    super(prpos);
    this.state = {
      discounts: [],
      dataList: [],
      refreshing: false
    }
  }

  componentDidMount() {
    this.requestData()
  }

  requestData = () => {
    this.setState({ refreshing: true })
    this.requestDiscount()
    this.requestRecommend()
  }

  // 请求推荐数据
  requestRecommend = async () => {
    try {
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
      this.setState({
        dataList: dataList,
        refreshing: false,
      })
    } catch (error) {
      console.log('请求出错', error)
      this.setState({ refreshing: false })
    }
  }

  // 请求区域
  requestDiscount = async () => {
    try {
      let response = await fetch(api.discount)
      let json = await response.json()
      this.setState({ discounts: json.data })
    } catch (error) {
      alert(error)
    }
  }

  //渲染推荐列表每一项
  renderItem = ({ item }: any) => {
    return <GroupPurchaseCell info={item} onPress={() => { }} />
  }

  //渲染列表头
  renderHeader = () => {
    return <View>
      <HomeMenuView menuInfos={api.menuInfo} onMenuSelected={() => { }} />
      <View style={styles.recommendHeader}>
        <Heading3>猜你喜欢</Heading3>
      </View>
    </View >
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.dataList}
          renderItem={this.renderItem}
          onRefresh={this.requestData}
          refreshing={this.state.refreshing}
          keyExtractor={(item, index) => {
            console.log(`id ${item.id}`)
            return item.id
          }}
          ListHeaderComponent={this.renderHeader}
        >
        </FlatList>
      </View>
    );
  }
}