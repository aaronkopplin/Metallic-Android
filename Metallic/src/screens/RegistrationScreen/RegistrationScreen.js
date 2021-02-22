import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, Dimensions, Platform} from "react-native";
import { firebase } from "../../firebase/config";
import { login } from "../LoginScreen/LoginScreen";
import CustomButton from "../../../button"
import { masterStyles } from '../../../../Metallic/masterStyles';
export default function RegistrationScreen({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const screenSize = Platform.OS === "web" ? Dimensions.get("window") : Dimensions.get("screen");
    const onFooterLinkPress = () => {
        console.log("Already Have Account Pressed");
        navigation.navigate("Login");
    };

    const onRegisterPress = () => {
        console.log("Create Account Pressed.");
        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                const usersRef = firebase.firestore().collection("users");
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        console.log("Attempting to navigate to home");
                    })
                    .catch((error) => {
                        console.log("error caught in firebase.");
                        alert(error);
                    });
            })
            .catch((error) => {
                alert(error);
            })
            .then(() => {
                console.log("Hoes mad");
                login(email, password);
            });
    };

    return (
        <View style={masterStyles.mainBackground}>

            <Image
                style={[masterStyles.logo, {flex: .5}]}
                source={require("../../../assets/icon.png")}
            />
                
            <View style={{
                flex: 4, 
                backgroundColor: "#2e2b30",
                width: screenSize.width - 20,
                height: Platform.OS === "web" ? screenSize.height/2.5 : screenSize.width - 30,
                paddingTop: screenSize.height / 50,
                paddingLeft: 20,
                borderRadius: 4,
            }}
            >

                <Text style={[masterStyles.headings, {paddingBottom: screenSize.height * .005}]}>Name</Text>

                <TextInput
                    style={[masterStyles.input,
                        {width: screenSize.width - 60}]}
                    placeholder="Full Name"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={[masterStyles.headings, {paddingBottom: screenSize.height * .005}]}>E-Mail</Text>                

                <TextInput
                    style={[masterStyles.input,
                        {width: screenSize.width - 60}]}
                    placeholder="E-mail"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={[masterStyles.headings, {paddingBottom: screenSize.height * .005}]}>Password</Text>

                <TextInput
                    style={[masterStyles.input,
                        {width: screenSize.width - 60}]}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={[masterStyles.headings, {paddingBottom: screenSize.height * .005}]}>Confirm Password</Text>

                <TextInput
                    style={[masterStyles.input,
                        {width: screenSize.width - 60}]}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder="Confirm Password"
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View
                    style={{
                        zIndex: 1,
                        paddingTop: screenSize.height / 20,
                        paddingBottom: screenSize.height / 70,
                    }}
                >
                    <CustomButton
                        onPress={onRegisterPress}
                        text="Create Account"
                        color="#1e1c21"
                        width={screenSize.width - 60}
                        height={screenSize.height / 20}
                    />
                </View>
                <View style={masterStyles.footerView}>
                    <Text style={masterStyles.footerText}>
                        Already got an account?{" "}
                        <Text
                            onPress={onFooterLinkPress}
                            style={masterStyles.footerLink}
                        >
                            Log in
                        </Text>
                    </Text>
                </View>
            </View>

            <View style={
                masterStyles.mainBackground,
                {flex: 1}
            }></View>

        </View>
    );
}