import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, ImageBackground, I18nManager } from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { Header } from '_components/Header';
import { HorizontalRow } from '_components/HorizontalRow';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
const items = [
  { label: 'Romance', value: 'romance' },
  { label: 'Horror', value: 'horror' },
  { label: 'Thriller', value: 'thriller' },
  { label: 'Suspense', value: 'suspense' },
  { label: 'Biography', value: 'biography' },
  { label: 'Mystery', value: 'mystery' },
  { label: 'Action', value: 'action' },
];
const FilterModal = (props) => {

  const { t } = useTranslation(["Filter"])
  const { colors } = useTheme();
  const { buttonLabel, visible, onApply, onToggle } = props;
  const [state, setState] = useState(new Set());

  const onselect = (val) => {

    state.has(val) ? state.delete(val) : ((state.size < 3) && state.add(val));
    setState(new Set(state));
  };
  useEffect(useState()[1]);
  const FilterText = (props) => {
    var selected = props.selected;
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.filterTextArea}>
          <AppText
            style={styles.filterText}
            bold={selected}
            color={selected && colors.primary}>
            {props.title}
          </AppText>
          {selected && (
            <Icon
              size={19}
              color={selected && colors.primary}
              name="check"
              type="antdesign"
            />
          )}
        </View>
        <HorizontalRow style={styles.line} />
      </TouchableOpacity>
    );
  };
  const reset = () => setState(new Set());

  return (
    <Modal animationType="fade" visible={visible}>
      <View style={styles.container}>


        <Header {...props} title={t("filter")}
          headerImage
          headerLeft={
            <Icon
              color={colors.primary}
              onPress={onToggle}
              name="leftcircleo"
              type="antdesign" />
          } />




        <AppText
          size={18}
          right
          onPress={() => reset()}
          color={colors.primary}
          style={{ paddingVertical: hp(1), paddingHorizontal: wp(1) }}>
          {t('reset')}
        </AppText>
        <HorizontalRow style={styles.line} />
        <AppText bold color={colors.placeholder} style={{ paddingVertical: 16, paddingHorizontal: wp(5) }}>
          {t('filterByGenre')}
        </AppText>
        {items.map((item) => {
          return (
            <FilterText
              style={{ paddingHorizontal: wp(2) }}
              key={item.label}
              title={t(item.label)}
              selected={state.has(item.value)}
              onPress={() => onselect(item.value)}
            />
          );
        })}

        <Button
          color="white"
          style={{ position: 'absolute', width: wp(90), alignSelf: 'center', bottom: 30, }}
          onPress={() => onApply([...state])}>
          {t("apply")}
        </Button>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  line: {
    borderWidth: wp(0.1),
    borderColor: 'rgb(200,200,200)',
  },
  filterTextArea: {
    width: wp(90),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterText: {
    paddingVertical: wp(3),
  },
});

export { FilterModal };
