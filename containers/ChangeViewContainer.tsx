import TimerActions from '../data/TimerActions';

import React from 'react';
import TimerStore from '../data/TimerStore';
import { Container } from 'flux/utils';

import { TouchableOpacity, Text } from 'react-native';

class ChangeViewContainer extends React.Component<any, any> {

    static getStores() {
        return [TimerStore];
    }

    static calculateState(prevState: any) {
        return {
            view: TimerStore.getView
        };
    }

    constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <TouchableOpacity onPress={() => {
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
