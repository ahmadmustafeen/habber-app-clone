import React, {useState} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {AppText, Button, Screen} from './common';
import {Header} from './Header';
const items = [
  {label: 'Romance', value: ''},
  {label: 'Horror', value: ''},
  {label: 'Thriller', value: ''},
  {label: '', value: ''},
  {label: '', value: ''},
  {label: '', value: ''},
];

const FilterModal = (props) => {
  const {buttonLabel, visible, onApply} = props;
  const [state, setState] = useState(new Set());

  const onselect = (val) => {
    state.has(val) ? state.delete(val) : state.add(val);
    setState(state);
  };
  return (
    <Modal animationType="fade" visible={visible}>
      <View style={styles.container}>
        <Header title="Filter" {...props} />
        <AppText>Filter by genre</AppText>
        {items.map((item) => {
          return (
            <AppText onPress={() => onselect(item.label)}>{item.label}</AppText>
          );
        })}
        <Button color="white" onPress={() => onApply([...state])}>
          Apply
        </Button>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {FilterModal};
