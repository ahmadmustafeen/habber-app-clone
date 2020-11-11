import React, { useState, useEffect } from 'react'
import { View, Dimensions, Image, Text, FlatList, StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const FlatListSlider = (props) => {
    let CurrentSlide = 0;
    let IntervalTime = 6000;
    const screenWidth = Dimensions.get("window").width
    const [index, setIndex] = useState(0)
    const scrollRef = React.createRef();

    const images = [
        "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    ];
    useEffect(() => {
        setInterval(_goToNextPage, IntervalTime);

    }, [])

    const renderItem = ({ item }) => {
        return (
            <Image style={{ width: wp(100), height: 200 }}
                id={item} source={{
                    uri: item,
                }} />
        )
    };
    const flatList = React.useRef(null);
    const _goToNextPage = () => {
        if (CurrentSlide >= images.length - 1) CurrentSlide = 0;
        // console.log(CurrentSlide);
        flatList.current.scrollToIndex({
            index: ++CurrentSlide,
            animated: true,
        })
    };

    const _keyExtractor = (item, index) => {
        return index.toString();
    }
    return (
        < View>

            <FlatList
                style={styles.flatList}
                pagingEnabled={true}
                data={images}
                renderItem={renderItem}
                keyExtractor={_keyExtractor}
                horizontal={true}
                ref={flatList}
                flatListRef={React.createRef()}

            />


        </View >
    )
}
const styles = StyleSheet.create({
    flatList: {
        width: '100%',
        height: 200,
    }
})

export { FlatListSlider }