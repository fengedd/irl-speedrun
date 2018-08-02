import * as React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import AddSplitScreen from './screens/AddSplitScreen';
import TimerActions from './data/TimerActions';
import { AsyncStorage } from 'react-native';

// tslint:disable-next-line:variable-name
const RootStack: any = StackNavigator(
  {
    Home: HomeScreen,
    AddSplitScreen: AddSplitScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this._loadTimers();
  }

  public render() {
    return (
      <RootStack />
    );
  }

  private async _loadTimers(): Promise<void> {
    let entries: string = await AsyncStorage.getItem('timers');
    TimerActions.loadTimers(entries);
    TimerActions.totalComparisonTimeSet();
  }
}