import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'
import Color from './Color';

const styles = StyleSheet.create({
    container: {
        height: 14,
        backgroundColor: Color.paper
    }
});

export default class SpacingView extends React.Component<any, any> {
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}