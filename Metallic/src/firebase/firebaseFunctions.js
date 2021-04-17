import { firebase } from "./config";
import * as WalletFunctions from "../ethereum/walletFunctions";

export async function firebaseLogin(email, password) {
    var errorMesasage = "";

    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        WalletFunctions.clearKeysNotForThisUser();
    } catch (error) {
        errorMesasage += error;
    }

    return errorMesasage;
}

export async function firebaseGetUserAccount() {
    var score = 0;
    var name = "";
    var email = "";
    var createdDate = "";
    var userName = "";
    var privateKey = "";
    var mnemonic = "";
    var address = "";

    var user = firebase.auth().currentUser;
    var database = firebase.firestore();
    var userId;
    if (user != null) {
        userId = user.uid;

        var usersCollection = database.collection("users");
        const snapshot = await usersCollection.where("id", "==", userId).get();

        var scoreRef = database.collection("users").doc(userId);

        scoreRef.onSnapshot(async function (snap) {
            if (snap.data().score == undefined) {
                await scoreRef.update({ score: score });
            }
        });

        if (!snapshot.empty) {
            snapshot.forEach((doc) => {
                name = doc.data().fullName;
                email = doc.data().email;
                createdDate = user.metadata.creationTime;
                userName = doc.data().userName;
                score = doc.data().score;
            });
        }

        var wallet = await WalletFunctions.loadWalletFromPrivate();
        privateKey = wallet.privateKey;
        address = wallet.address;
        mnemonic = await WalletFunctions.loadMnemonic();

        return {
            name: name,
            userName: userName,
            score: score,
            email: email,
            createdDate: createdDate,
            privateKey: privateKey,
            mnemonic: mnemonic,
            address: address,
        };
    }
}

export async function firebaseLogout() {
    try {
        firebase.auth().signOut();
    } catch (error) {
        console.log("logout error: " + error);
    }
}

export async function firebaseCreateAccountAndLogIn(
    email,
    password,
    name,
    userName,
    address
) {
    var errorMessage = "";
    const db = firebase.firestore();
    const snapshot = await db
        .collection("users")
        .where("userName", "==", userName)
        .get();

    if (!snapshot.empty) {
        errorMessage += "Username Already Taken.\n";
    }

    const snapshot2 = await db
        .collection("users")
        .where("email", "==", email)
        .get();

    if (!snapshot2.empty) {
        errorMessage += "Email Already In Use.\n";
    }

    if (errorMessage == "") {
        try {
            var response = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);

            const uid = response.user.uid;
            const usersRef = firebase.firestore().collection("users");
            try {
                await usersRef.doc(uid).set({
                    id: uid,
                    email: email,
                    fullName: name,
                    userName: userName,
                    address: address,
                });

                await usersRef.doc(uid).collection("Contacts").doc(name).set({
                    userName: userName,
                    fullName: name,
                    email: email,
                });

                WalletFunctions.clearKeysNotForThisUser();
            } catch (error) {
                errorMessage += error + "\n";
            }
        } catch (error) {
            errorMessage += error + "\n";
        }
    }

    console.log(errorMessage);
    return errorMessage;
}
