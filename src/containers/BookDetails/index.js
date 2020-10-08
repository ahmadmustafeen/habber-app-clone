import React from 'react';
import {View, ScrollView} from 'react-native';
import {BookDetailsCard, TitleBarWithIcon} from '../../components';

import {AppText} from '../../components/common';

const BookDetails = (props) => {
  // const {label, data} = props.route.params;

  return (
    <ScrollView>
      <TitleBarWithIcon label="BookDetails" />
      <BookDetailsCard />
    </ScrollView>
  );
};
export default BookDetails;
