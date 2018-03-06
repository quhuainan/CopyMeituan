import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as React from 'react'
import { Heading1, Heading2, Paragraph } from '../../widget/Text';
import screen from '../../common/screen'
import Color from '../../widget/Color';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: screen.onePixel,
        borderColor: Color.border,
        backgroundColor: 'white'
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },
    price: {
        color: Color.primary
    }
});

type Props = {
    info: any,
    onPress: Function,
}

export default class GroupPurchaseCell extends React.Component<Props, any> {
    render() {
        let { info } = this.props
        let imageUrl = info.imageUrl.replace('w.h', '160.0')
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image source={{ uri: imageUrl }} style={styles.icon} />
                <View style={styles.rightContainer}>
                    <Heading2>{info.title}</Heading2>
                    <Paragraph numberOfLines={0} style={{ marginTop: 8 }}>{info.subtitle}</Paragraph>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Heading2 style={styles.price}>{info.price}元</Heading2>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}