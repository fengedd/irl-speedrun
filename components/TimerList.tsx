import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Timer from '../data/Timer';

type Props = {
    renderItem: (info: any) => JSX.Element,
    data: Timer[],
    keyExtractor: (item: any, index: number) => string
};

export default class TimerList extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <View style={styles.container}>
                <FlatList
                    renderItem={this.props.renderItem}
                    data={this.props.data}
                    keyExtractor={this.props.keyExtractor}
                    ItemSeparatorComponent={this._renderSeparator}
                />
            </View>
        );
    }

    private _renderSeparator = () => {
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
