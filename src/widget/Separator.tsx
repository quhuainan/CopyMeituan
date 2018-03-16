import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import screen from '../common/screen'
import Color from './Color';


type Props = {
    style?: any
}
export default class Separator extends React.Component<Props, any>{
    render() {
        return (<View style={styles.line} />)
    }
}

const styles = StyleSheet.create({
    line: {
        width: screen.width,
        height: screen.onePixel,
        backgroundColor: Color.border
    }
})