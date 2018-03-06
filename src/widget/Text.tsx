import * as React from 'react'
import { StyleSheet, Dimensions, Text } from 'react-native'
import Color from './Color';

export function Heading1({ style, ...props }: any) {
    return <Text style={[styles.h1, style]}  {...props} />
}
export function Heading2({ style, ...props }: any) {
    return <Text style={[styles.h2, style]} {...props} />
}
export function Paragraph({ style, ...props }: any) {
    return <Text style={[styles.p, style]} {...props} />
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 40,
        color: Color.primary,
    },
    h2: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
    },
    p: {
        fontSize: 13,
        color: '#999999'
    }
})