import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as React from 'react';

//todo type的意思
type Props = {
    icon?: any,
    iconStyle?: any,
    titleStyle?: any,
    title?: string,
    onPress?: Function,
}
export default  class NavigationItem extends React.Component<Props, any>{

    render() {
        //todo 这种表示方式需要研究
        let icon = this.props.icon && <Image style={[styles.icon, this.props.iconStyle]} source={this.props.icon} />
        let title = this.props.title && <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
        return (<TouchableOpacity style={styles.container} >
            {icon}
            {title}
        </TouchableOpacity>)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 27,
        height: 27,
        margin: 8,
    },
    title: {
        fontSize: 15,
        color: '#333333',
        margin: 8,
    }
})

