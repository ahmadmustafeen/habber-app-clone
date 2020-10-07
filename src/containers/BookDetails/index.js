import React from 'react';
import {View, ScrollView} from 'react-native';
import {BookDetailsCard, TitleBarWithIcon} from '_components';

import {AppText} from '_components/common';

const BookDetails = (props) => {
  // const {label, data} = props.route.params;

  return (
    <ScrollView>
      <TitleBarWithIcon label="BookDetaisl" />
      <BookDetailsCard />
    </ScrollView>
  );
};
export default BookDetails;
