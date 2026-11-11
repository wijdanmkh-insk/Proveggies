import {Text, View, StyleSheet} from 'react-native';
import{
    SafeAreaView, SafeAreaProvider, useSafeAreaInsets,
}from 'react-native-safe-area-context';

export default function Dashboard(){
    const insets = useSafeAreaInsets();

    return(
        <SafeAreaView style={{paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}}>
            <View>
                <Text>Hello World</Text>
            </View>
        </SafeAreaView>
    )
}