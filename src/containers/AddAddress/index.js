import React from 'react'

import { View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header, InputWithLabel } from '../../components'
import { Button } from '../../components/common'

const AddAddress = (props) => {
    return (
        <KeyboardAwareScrollView>
            <Header backImage title="asdas" />
            <InputWithLabel placeholder="First" color="black" />
            <InputWithLabel placeholder="Second" color="black" />
            <InputWithLabel placeholder="Third" color="black" />
            <InputWithLabel placeholder="Forth" color="black" />
            <InputWithLabel placeholder="ffith" color="black" />
            <InputWithLabel placeholder="sixth" color="black" />
            <InputWithLabel placeholder="seven" color="black" />
            <InputWithLabel placeholder="seven" color="black" />
            <InputWithLabel placeholder="seven" color="black" />
            <InputWithLabel placeholder="seven" color="black" />
            <Button primary>Check</Button>
        </KeyboardAwareScrollView>
    )
}
export default AddAddress