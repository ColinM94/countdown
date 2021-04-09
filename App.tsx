import * as React from 'react'
import { Button, View } from 'react-native';
import { Main } from "./src/Main"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export default function App() {
  return <Main />
}

/* export default function App() {
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(Platform.OS === 'ios');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View style={{ marginTop: 100 }}>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {if(show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"spinner"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
} */