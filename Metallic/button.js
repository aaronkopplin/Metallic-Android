import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View} from 'react-native';

const CustomButton = props => {
    const content = (
        <View style={[styles.button, { backgroundColor: props.color, width: props.width, height: props.height, top: props.top, bottom: props.bottom }]}>
            <Text style={styles.buttonText}>
                {props.text}
            </Text>
        </View>
    )

    return <TouchableOpacity onPress={props.onPress} >{content}</TouchableOpacity>
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
        
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
    }
});

export default CustomButton;