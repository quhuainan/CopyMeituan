import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as React from 'react'
import { Heading3, Paragraph } from './Text';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 8,
    },
    content: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
    },
    arrow: {
        width: 14,
        height: 14,
        marginLeft: 5,
    }

});

type Props = {
    image?: any,
    style?: any,
    title: string,
    subtitle?: string
}
export default class DetailCell extends React.Component<any, any> {
    render() {
        let icon = this.props.image && <Image style={styles.icon} source={this.props.image} />
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={[styles.content, this.props.style]}>
                        {icon}

                        <Heading3 style={{ marginLeft: 8 }}>{this.props.title}</Heading3>
                        <View style={{ flex: 1, backgroundColor: 'blue' }} />
                        <Paragraph style={{ color: '#999999' }}>{this.props.subtitle}</Paragraph>
                        <Image style={styles.arrow} source={require('../img/public/cell_arrow.png')} />
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}