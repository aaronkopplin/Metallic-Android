import React, { useState } from "react";
import { Image, Text, View, Dimensions, Platform, Alert } from "react-native";
import { firebase } from "../../firebase/config";
import CustomButton from "../../../button";
import { masterStyles } from "../../../../Metallic/masterStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as WalletFunctions from "../../ethereum/loadWallet";
import { useEffect } from "react";
import { Wallet } from "ethers";

export function AccountDetailScreen(props) {
    const screenSize =
        Platform.OS === "web"
            ? Dimensions.get("window")
            : Dimensions.get("screen");
    const [address, setAddress] = useState("Loading");
    const [privateKey, setPrivateKey] = useState("Loading");
    const [mnemonic, setMnemonic] = useState("Loading");

    useEffect(() => {
        const fetchBal = async () => {
            const wallet = await WalletFunctions.loadWalletFromPrivate();
            const storedMnemonic = await WalletFunctions.loadMnemonic();
            setAddress(wallet.address);
            setPrivateKey(wallet.privateKey);
            setMnemonic(storedMnemonic);
        };

        fetchBal();
    }, []);

    return (
        <View style={masterStyles.mainBackground}>
            <View style={(masterStyles.mainBackground, { flex: 0.5 })}></View>
            <View
                style={{
                    flex: 4,
                    backgroundColor: "#2e2b30",
                    width: screenSize.width - 40,
                    height:
                        Platform.OS === "web"
                            ? screenSize.height / 2.5
                            : screenSize.width - 30,
                    paddingTop: screenSize.height / 50,
                    alignItems: "center",
                    borderRadius: 4,
                }}
            >
                <Text
                    style={[
                        masterStyles.headingsSmall,
                        {
                            paddingBottom: screenSize.height * 0.005,
                            textAlign: "center",
                        },
                    ]}
                >
                    address: {address}
                </Text>
                <Text
                    style={[
                        masterStyles.headingsSmall,
                        {
                            paddingBottom: screenSize.height * 0.005,
                            textAlign: "center",
                        },
                    ]}
                >
                    private Key: {privateKey}
                </Text>
                <Text
                    style={[
                        masterStyles.headingsSmall,
                        {
                            paddingBottom: screenSize.height * 0.005,
                            textAlign: "center",
                        },
                    ]}
                >
                    mnemonic: {mnemonic}
                </Text>
            </View>
            <View style={(masterStyles.mainBackground, { flex: 0.5 })}></View>
        </View>
    );
}