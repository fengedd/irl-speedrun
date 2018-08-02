import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

export default class TimerList extends React.PureComponent<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    renderItem={this.props.renderItem}
                    data={this.props.data}
                    keyExtractor={this.props.keyExtractor}
                    extraData={this.props.extraData}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }

    renderSeparator = () => {
        return (
            <View
                style={styles.separator}
            />
        );
    }

}

const styles: any = StyleSheet.create({
    container: {
        height: '80%',
        width: '100%'
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#232323'
    }
});
