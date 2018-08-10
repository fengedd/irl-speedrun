import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FooterBarView } from '../misc/ViewTypes';
import { Button } from 'react-native-material-ui';

type Props = {
    stopStart: () => void,
    undo: () => void,
    skip: () => void,
    split: () => void,
    view: FooterBarView
};

export default class FooterBar extends React.PureComponent<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render(): JSX.Element {
        return this._renderButtons();
    }

    private _renderButtons(): JSX.Element {
        if (this.props.view === 'start') {
            return this._renderStartButtons();
        } else {
            return this._renderRunButtons();
        }
    }

    private _renderStartButtons(): JSX.Element {
        return (
            <Button style={{ container: styles.button }} raised={true} primary={true}
                upperCase={true} icon={'directions-run'} text='Start' onPress={this.props.stopStart} />
        );
    }

    private _renderRunButtons(): JSX.Element {
        const isEndOfRun: boolean = this.props.view === 'reset';
        return (
            <View style={styles.runButtons}>
                <Button style={{ container: styles.button }} raised={true} primary={true}
                    upperCase={true} icon={'redo'} text='Undo' onPress={this.props.undo} />
                <Button style={{ container: styles.button }} raised={true} primary={true}
                    upperCase={true} icon={'skip-next'} text='Skip' onPress={this.props.skip} />
                <Button style={{ container: styles.button }} raised={true} primary={true}
                    upperCase={true} icon={isEndOfRun ? 'refresh' : 'done'} text={isEndOfRun ? 'Reset' : 'Split'} onPress={this.props.split} />
            </View>
        );
    }

}

const styles: any = StyleSheet.create({
    runButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: 'black'
    }
});