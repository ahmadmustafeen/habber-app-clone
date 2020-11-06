import React, { useState } from 'react';

import { View, StyleSheet, Text } from 'react-native';
// import { useTranslation } from 'react-i18next';
import {
    // Counter,
    DashboardComponent,
    // ImageSlider,
    // ThumbnailBookmarks,
    // ThumbnailClub,
    // TitleBarWithIcon,
    HeaderSearch,
} from '_components';
// import {
//     REQUESTBOOKS_SCREEN,
//     BOOKLIST_SCREEN,
//     BOOK_CLUBS,
//     BOOKMARKS,
// } from '_constants/Screens';
// import { sliderImages } from './dummydata';
// import { ThumbnailBook } from '_components/ThumbnailBook';
// import { Screen } from '_components/common';
// import { booksData, booksClub, bookmarkdata } from '_assets/data/dummydata';
// import { useDispatch } from 'react-redux';
// import { withDataActions } from '../../redux/actions/GenericActions';
// import {
//     FETCH_ARABIC_BOOKS,
//     FETCH_BOOK_LISTS,
//     FETCH_ENGLISH_BOOKS,
//     FETCH_RELATED_BOOKS,
// } from '../../redux/actionTypes';

const Search = (props) => {
    const { navigate } = props.navigation;
    // const [images] = useState(sliderImages);
    // const [data] = useState(booksData);
    // const [data_book_club] = useState(booksClub);
    // const [bookmark_data] = useState(bookmarkdata);
    // const { t } = useTranslation();
    // const dispatch = useDispatch();
    return (
        <View>
            <HeaderSearch />
        </View>
    );
};
const styles = StyleSheet.create({
    requestBooksBtns: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingEnd: 10,
        paddingBottom: 20,
    },
});
export default Search;
