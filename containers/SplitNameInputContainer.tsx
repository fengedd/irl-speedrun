import React from 'react';
import SplitNameInput from '../components/SplitNameInput';

export default class SplitNameInputContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            clearTextOnFocus: true,
            defaultValue: 'Add title for split..'
        };
    }

    render(): JSX.Element {
        return (
            <SplitNameInput
                clearTextOnFocus={this.state.clearTextOnFocus}
                defaultValue={this.state.defaultValue}
                onChangeText={this.props.nameCallBack}
            />
        );
    }
}