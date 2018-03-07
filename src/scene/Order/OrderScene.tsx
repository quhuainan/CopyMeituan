import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'

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

export default class OrderScene extends React.Component<any, any> {
    render() {
        return (
                <Text style={styles.welcome}>
                    订单
        </Text>
        );
    }
}