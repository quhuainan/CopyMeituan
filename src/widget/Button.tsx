import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, StyleProp, TextStyle } from "react-native"

import * as React from 'react'

type Props = {
    onPress?: Function,
    disable?: boolean,
    style: StyleProp<ViewStyle>,
    title: string,
    titleStyle: StyleProp<TextStyle>,
    activeOpcity?: number,

}
export default class Button extends React.Component<Props, any>{
    static defaultProps = {
        onPress: () => { },
        disable: false,
        activeOpcity: 0.8,
    }
    render() {
        let { onPress, disable, style, title, titleStyle, activeOpcity } = this.props
        return (<TouchableOpacity
            style={[styles.container, style]}
            onPress={() => onPress}
            disabled={disable}
            activeOpacity={activeOpcity}
        ><Text style={titleStyle}>{title}</Text></TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})