import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'
import HomeMenuItem from './HomeMenuItem';
import screen from '../../common/screen'
import Swiper from 'react-native-swiper';



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    menuContainer: {
        flexDirection: 'row',
    },
    itemsView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: screen.width,
    },
});

type Props = {
    menuInfos: Array<any>,
    onMenuSelected: Function,
}
type State = {
    currentPage: number
}
export default class HomeMenuView extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
    }
    render() {
      /*   let { menuInfos, onMenuSelected } = this.props
        let menuItems = menuInfos.map((info, index) => (<HomeMenuItem key={info.title} onPress={() => { }} icon={info.icon} title={info.title} />))
        let menuViews: Array<React.ReactNode> = []
        let pageCount = Math.ceil(menuItems.length / 10)
        for (let i = 0; i < pageCount; i++) {
            let items = menuItems.slice(i * 10, i * 10 + 10)
            let menuView = (<View style={styles.itemsView} key={i}>
                {items}
            </View>)
            menuViews.push(menuView)
        } */
        return (
            <Swiper showsButtons={true}>
                   <Text>123</Text>
                </Swiper> 
        );
    }
}
