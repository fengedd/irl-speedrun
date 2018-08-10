import TimerActions from '../data/TimerActions';
import React from 'react';
import TimerStore from '../data/TimerStore';
import { Container } from 'flux/utils';
import { TouchableOpacity, Text } from 'react-native';
import { ComparisonView } from '../misc/ViewTypes';

type Props = {
};

type State = {
    view: ComparisonView
};

class ChangeViewContainer extends React.Component<Props, State> {

    static getStores() {
        return [TimerStore];
    }

    static calculateState(prevState: State) {
        return {
            view: ComparisonView.expected
        };
    }

    constructor(props: Props) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <TouchableOpacity disabled={true} onPress={() => {
                TimerActions.changeView();
                TimerActions.totalComparisonTimeSet();
            }} >
                <Text>{'View: ' + this.state.view}</Text>
            </TouchableOpacity>

        );
    }
}

const container = Container.create(ChangeViewContainer);
export default container;
