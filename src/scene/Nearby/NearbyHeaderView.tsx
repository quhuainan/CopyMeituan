import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as React from 'react'
import screen from '../../common/screen'
import Color from '../../widget/Color';
import { Paragraph } from '../../widget/Text';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        width: screen.width / 4 - 10,
        marginLeft: 8,
        marginTop: 5,
        marginBottom: 5,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: screen.onePixel,
        borderColor: Color.border
    },
});

type Props = {
    titles: Array<string>,
    selectedIndex: number,
    onSelected: Function,
}
export default class NearbyHeaderView extends React.Component<Props, any> {
    static defaultProps = {
        onSelected: () => { }
    }
    render() {

        return (
            <View style={styles.container}>
                {this.props.titles.map((title, i: number) => (
                    <TouchableOpacity
                        key={i}
                        style={[{ backgroundColor: this.props.selectedIndex == i ? '#FE566D' : 'white' }, styles.item]}
                        onPress={() => {
                            console.log('选中的值', this.props.selectedIndex,i)
                            this.props.onSelected(i)
                        }}>
                        <Paragraph style={{ color: this.props.selectedIndex == i ? 'white' : '#555555' }}>
                            {title}
                        </Paragraph>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}
