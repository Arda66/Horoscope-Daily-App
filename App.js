import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import Key from './src/auth/Key';

const App = () => {
  const [Result, setResult] = useState('');
  const [open, setOpen] = useState(false);
  const [Sign, SetSign] = useState('');
  const [items, setItems] = useState([
    {label: 'Aries (Koç)', value: 'aries'},
    {label: 'Taurus (Boğa)', value: 'taurus'},
    {label: 'Gemini (İkizler)', value: 'gemini'},
    {label: 'Cancer (Yengeç)', value: 'cancer'},
    {label: 'Leo (Aslan)', value: 'leo'},
    {label: 'Virgo (Başak)', value: 'virgo'},
    {label: 'Libra (Terazi)', value: 'libra'},
    {label: 'Scorpio (Akrep)', value: 'scorpio'},
    {label: 'Sagittarius (Yay)', value: 'sagittarius'},
    {label: 'Capricorn (Oğlak)', value: 'capricorn'},
    {label: 'Aquarius (Kova)', value: 'aquarius'},
    {label: 'Pisces (Balık)', value: 'pisces'},
  ]);

  const GetResult = sign => {
    const options = {
      method: 'POST',
      url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
      params: {sign: sign, day: 'today'},
      headers: {
        'X-RapidAPI-Key': Key,
        'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setResult(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const ConditionalColor = () => {
    if (Result.color) {
      switch (Result.color) {
        case 'Sky Blue' || 'Navy Blue':
          return 'blue';
        case 'Peach':
          return 'orange';
        case 'Spring Green':
          return 'green';
        case 'Copper':
          return '#B87333';
        case 'Shadow Black':
          return '#bfafb2 ';
        default:
          return Result.color.toString().toLowerCase();
      }
    }
  };

  const TextSection = ({label, value}) => {
    return (
      <Text style={[styles.BottomText, {color: ConditionalColor()}]}>
        {label} : {value}
      </Text>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.DropDownPicker}>
        <DropDownPicker
          items={items}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          open={open}
          setOpen={setOpen}
          placeholder={Sign == '' ? 'Select a Sign' : Sign.toLocaleUpperCase()}
          setValue={SetSign}
          setItems={setItems}
          onSelectItem={sign => {
            GetResult(sign.value);
          }}
        />
      </View>
      <View style={styles.BottomWrapper}>
        <TextSection label={'Current Date'} value={Result.current_date} />
        <TextSection label={'Color'} value={Result.color} />
        <TextSection label={'Compatibility'} value={Result.compatibility} />
        <TextSection label={'Date-Range'} value={Result.date_range} />
        <TextSection label={'Lucky Time'} value={Result.lucky_time} />
        <TextSection label={'Mood'} value={Result.mood} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.ScrollContainer}>
          <Text style={styles.ResultText}>{Result.description}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  DropDownPicker: {
    backgroundColor: '#fff',
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
    flex: 0.5,
  },
  ScrollContainer: {
    elevation: 3,
    marginHorizontal: 5,
    marginVertical: 10,
    borderWidth: 0.1,
    borderColor: 'grey',
  },
  ResultText: {
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 30,
    letterSpacing: 1,
  },
  BottomWrapper: {
    flex: 1,
  },
  BottomText: {
    marginTop: 10,
    marginHorizontal: 10,
    fontSize: 23,
    fontWeight: 'bold',
  },
});
