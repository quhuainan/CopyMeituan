
import { Image } from 'react-native';
import * as React from 'react'
type Props = {
    tintColor: any,
    normalImage: any,
    selectedImage: any,
    focused: boolean,
}
class TabBarItem extends React.Component<Props, any>{

    render() {
        let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
        return <Image style={{ tintColor: this.props.tintColor, width: 25, height: 25 }}
            source={this.props.focused ? selectedImage : this.props.normalImage} />
    }
}
export default TabBarItem
