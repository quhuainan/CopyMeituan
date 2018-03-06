import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom, NavigationScreenConfig } from 'react-navigation'
import * as React from 'react'
import HomeScene from './scene/Home/HomeScene';
import NearbyScene from './scene/Nearby/NearbyScene';
import OrderScene from './scene/Order/OrderScene';
import MineScene from './scene/Mine/MineScene';
import WebScene from './widget/WebScene';
import GroupPurchase from './scene/GroupPurchase/GroupPurchase';
import TabBarItem from './widget/TabBarItem';
import Color from './widget/Color'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  },
});

export default class RootScene extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    StatusBar.setBarStyle('light-content')
  }
  render() {
    return (
      <Navigator />
    );
  }
}


const Tab = TabNavigator(
  {
    Home: {
      screen: HomeScene,
      navigationOptions: ({ navigation }: any) => ({
        tabBarLabel: '团购',
        tabBarIcon: ({ focused, tintColor }: any) => (<TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={require('./img/tabbar/tabbar_homepage.png')}
          selectedImage={require('./img/tabbar/tabbar_homepage_selected.png')}
        />)
      }),

    },
    Nearby: {
      screen: NearbyScene,
      navigationOptions: ({ navigation }: any) => ({
        tabBarLabel: '附近',
        tabBarIcon: ({ focused, tintColor }: any) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('./img/tabbar/tabbar_merchant.png')}
            selectedImage={require('./img/tabbar/tabbar_merchant_selected.png')}
          />
        )
      })
    },
    Order: {
      screen: OrderScene, navigationOptions: ({ navigation }: any) => ({
        tabBarLabel: '订单',
        tabBarIcon: ({ focused, tintColor }: any) => (<TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={require('./img/tabbar/tabbar_order.png')}
          selectedImage={require('./img/tabbar/tabbar_order_selected.png')}
        />)
      })
    },
    Mine: {
      screen: MineScene,
      navigationOptions: ({ navigation }: any) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }: any) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={require('./img/tabbar/tabbar_mine.png')}
            selectedImage={require('./img/tabbar/tabbar_mine_selected.png')}
          />
        )
      })
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: Color.primary,
      inactiveTintColor: Color.gray,
      style: { backgroundColor: '#ffffff' }
    },
  },
);

const Navigator = StackNavigator(
  {
    Tab: { screen: Tab },
    Web: { screen: WebScene },
    GroupPurchase: { screen: GroupPurchase }
  },

  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
    }
  }
);