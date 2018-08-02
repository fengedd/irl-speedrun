import {
    StyleSheet, View, TextInput
} from 'react-native';
import React from 'react';

type SplitNameInputProps = {
    onChangeText: ((newText: string) => void),
    clearTextOnFocus: boolean,
    defaultValue: string
};

export default class SplitNameInput extends React.Component<any, any> {
    constructor(props: SplitNameInputProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <View style={styles.timerInput}>
                <TextInput
                    style={styles.nameText}
                    maxLength={14}
                    onChangeText={(newText): string => this.props.onChangeText(newText)}
                    clearTextOnFocus={this.props.clearTextOnFocus}
                    defaultValue={this.props.defaultValue}
                />
            </View>
        );
    }

}

const styles: any = StyleSheet.create({

    timerInput: {
        paddingHorizontal: 20,
        borderBottomWidth: 3,
        borderColor: '#232323',
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100

    },

    nameText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }

});
