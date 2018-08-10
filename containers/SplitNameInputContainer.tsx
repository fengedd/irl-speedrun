import React from 'react';
import SplitNameInput from '../components/SplitNameInput';

type Props = {
    nameCallBack: (name: string) => void
};

type State = {
    clearTextOnFocus: boolean,
    defaultValue: string
};

export default class SplitNameInputContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clearTextOnFocus: true,
            defaultValue: 'Add title for split..'
        };
    }

    public render(): JSX.Element {
        return (
            <SplitNameInput
                clearTextOnFocus={this.state.clearTextOnFocus}
                defaultValue={this.state.defaultValue}
                onChangeText={this.props.nameCallBack}
            />
        );
    }
}