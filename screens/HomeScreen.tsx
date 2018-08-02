import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import AddSplitScreen from './AddSplitScreen';
import TimerListContainer from '../containers/TimerListContainer';
import TotalTimerContainer from '../containers/TotalTimerContainer';
import FooterBarContainer from '../containers/FooterBarContainer';
import ChangeViewContainer from '../containers/ChangeViewContainer';
import { Icon } from 'react-native-material-ui';

export default class HomeScreen extends React.Component<any, any> {

  static navigationOptions = ({ navigation, screenProps }: any) => {

    return {
      title: 'Home',
      headerRight:
        <TouchableOpacity onPress={() => {
          navigation.navigate('AddSplitScreen', { addSplitScreen: AddSplitScreen });
        }} >
          <Icon name='add' />
        </TouchableOpacity>
      ,
      headerLeft: <ChangeViewContainer />

    };
  }

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
        <TimerListContainer />
        <TotalTimerContainer />
        <FooterBarContainer />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#1A1A1A'
  }
});
