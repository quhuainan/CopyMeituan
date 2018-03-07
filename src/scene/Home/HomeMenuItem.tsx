import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as React from 'react'
import { Heading3 } from '../../widget/Text';
import screen from '../../common/screen'
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 5,
        height: screen.height / 8
    },
    icon: {
        width: screen.width / 9,
        height: screen.width / 9,
        margin: 5
    },
});
type Props = {
    onPress: Function,
    icon: any,
    title: string,
}
export default class HomeMenuItem extends React.Component<Props, any> {
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon} />
                <Heading3>{this.props.title}</Heading3>
            </TouchableOpacity >
        );
    }
}