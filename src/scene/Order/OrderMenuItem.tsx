import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as React from 'react'
import screen from '../../common/screen'
import { Heading3 } from '../../widget/Text';
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 4,
        height: screen.width / 5
    },
    icon: {
        width: 30,
        height: 30,
        margin: 5
    },
});

type Props = {
    icon: any,
    title: string,
    onPress?: Function,
}
export default class OrderMenuItem extends React.Component<Props, any> {
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon} />
                <Heading3>{this.props.title}</Heading3>
            </TouchableOpacity>
        );
    }
}