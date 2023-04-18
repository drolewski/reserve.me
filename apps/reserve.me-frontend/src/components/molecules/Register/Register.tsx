import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {createRef, useState} from 'react';
import {emailReg, passwordReg} from '../../../const/RegExp';

interface RegistrationData {
    userName: string;
    email: string;
    phoneCode: string;
    phoneNumber: string;
    password: string;
}

const Register = ({navigation}: any) => {
    const [isRegisterSucceed, setRegisterSucceed] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');
    const [userName, setUserName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phoneCode, setPhoneCode] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [repeatedPassword, setRepeatedPassword] = useState<string>();

    const emailRef = createRef();
    const phoneCodeRef = createRef();
    const phoneNumberRef = createRef();
    const passwordRef = createRef();
    const repeatPasswordRef = createRef();

    const handleSubmitButton = () => {
        setErrorText('');
        if (!userName) {
            setErrorText('Set username');
            return;
        }
        if (!email) {
            setErrorText('Set email');
            return;
        }
        if (!emailReg.test(email)) {
            setErrorText('Invalid email');
            return;
        }
        if (!phoneCode) {
            setErrorText('Set phone code');
            return;
        }
        if (!phoneNumber) {
            setErrorText('Set phone number');
            return;
        }
        if (!password) {
            setErrorText('Set password');
            return;
        }
        if (!passwordReg.test(password)) {
            setErrorText('Password should have at least one special character and one number and between 6 and 16 signs');
            return;
        }
        if (!repeatedPassword) {
            setErrorText('Confirm given password');
            return;
        }
        if (!passwordReg.test(repeatedPassword)) {
            setErrorText('Password should have at least one special character and one number and between 6 and 16 signs');
            return;
        }
        if (password !== repeatedPassword) {
            setErrorText('Passwords are not compatible');
            return;
        }
        const registrationData: RegistrationData = {email, phoneCode, phoneNumber, password, userName};
        setRegisterSucceed(true);
        console.log(registrationData);
        // TODO backend communication
    }

    if (isRegisterSucceed) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                <Text style={styles.successTextStyle}>
                    Registration Successful
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={{flex: 1}}>
            {/* TODO Loader */}
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.sectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(userName) => setUserName(userName)}
                            placeholder="Enter username"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            onSubmitEditing={() => emailRef.current && emailRef.current.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.sectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(email) => setEmail(email)}
                            placeholder="Enter email"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="email-address"
                            autoComplete="email"
                            inputMode="email"
                            textContentType="emailAddress"
                            ref={emailRef}
                            returnKeyType="next"
                            onSubmitEditing={() => phoneCodeRef.current && phoneCodeRef.current.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.sectionStyle}>
                        {/* TODO county code dropdown */}
                        {/* TODO Maybe move phone setting into user settings screen? */}
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(code) => setPhoneCode(code)}
                            placeholder="48"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="numeric"
                            returnKeyType="next"
                            ref={phoneCodeRef}
                            onSubmitEditing={() => phoneNumberRef.current && phoneNumberRef.current.focus()}
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(number) => setPhoneNumber(number)}
                            placeholder="Enter phone number"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="numeric"
                            returnKeyType="next"
                            ref={phoneNumberRef}
                            onSubmitEditing={() => passwordRef.current && passwordRef.current.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.sectionStyle}>
                        {/* TODO Show password on button click */}
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={true}
                            autoComplete="password-new"
                            placeholder="Enter password"
                            placeholderTextColor="#8b9cb5"
                            returnKeyType="next"
                            ref={passwordRef}
                            onSubmitEditing={() => repeatPasswordRef.current && repeatPasswordRef.current.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.sectionStyle}>
                        {/* TODO Show password on button click */}
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(password) => setRepeatedPassword(password)}
                            secureTextEntry={true}
                            autoComplete="password-new"
                            placeholder="Enter password"
                            placeholderTextColor="#8b9cb5"
                            returnKeyType="next"
                            ref={repeatPasswordRef}
                            blurOnSubmit={false}
                        />
                    </View>
                    {errorText !== '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errorText}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    buttonStyle: {
        backgroundColor: '#8b9cb5',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#8b9cb5',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: '#8b9cb5',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
})

export default Register;
