import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-material-ui';
import TimerStore from '../data/TimerStore';
import TimerActions from '../data/TimerActions';
import SplitNameInputContainer from '../containers/SplitNameInputContainer';
import SplitTimeInputContainer from '../containers/SplitTimeInputContainer';

export default class AddSplitScreen extends React.Component<any, any> {

  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Add Split',
      headerLeft:
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name='arrow-back' />
        </TouchableOpacity>
      ,
      headerRight:
        <TouchableOpacity onPress={() => {
          const id: String = navigation.state.params.name;
          const expectedTime: number = navigation.state.params.expectedTime;
          if (!id || !expectedTime) Alert.alert('Invalid Timer');
          const idIsNotUnique: boolean = TimerStore.getState().timers.has(id);
          const idIsTooLong: boolean = id.length > 14;
          const idIsTooShort: boolean = id.length <= 0;

          if (idIsNotUnique) {
            Alert.alert('This name is already used.');
          } else if (idIsTooLong) {
            Alert.alert('This name is too long.');
          } else if (idIsTooShort) {
            Alert.alert('This name is too short.');
          } else {
            TimerActions.timerAdd(id, expectedTime);
            navigation.goBack();
          }
        }}>
          <Icon name='done' />
        </TouchableOpacity>
    };

  }

  public constructor(props: any) {
    super(props);
    this.props.navigation.setParams({ name: '' });
  }

  public render(): JSX.Element {
    return (
      <View style={styles.main}>
        <SplitNameInputContainer nameCallBack={this.nameCallback} />
        <SplitTimeInputContainer expectedTimeCallback={this.expectedTimeCallback} />
      </View>
    );
  }

  public nameCallback = (inputName: string) => {
    this.props.navigation.setParams({ name: inputName });
  }

  public expectedTimeCallback = (inputExpectedTime: number) => {
    this.props.navigation.setParams({ expectedTime: inputExpectedTime });
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#1A1A1A',
    height: '100%'
  }
});
