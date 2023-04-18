import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {createRef, useState} from 'react';
import {emailReg, passwordReg} from '../../../const/RegExp';

interface LoginData {
    email: string;
    password: string;
}

const Login = ({navigation}: any) => {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [errorText, setErrorText] = useState<string>('');

    const passwordRef = createRef();

    const handleSubmitButton = () => {
        setErrorText('');
        if (!email) {
            setErrorText('Set email');
            return;
        }
        if (!emailReg.test(email)) {
            setErrorText('Invalid email');
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
        const loginData: LoginData = {email, password};
        console.log(loginData);
        // TODO backend call
        navigation.reset({index: 0, routes: [{ name: 'Home' }]});
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView>
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
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current && passwordRef.current.focus()}
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(password) => setPassword(password)}
                        placeholder="Enter password"
                        placeholderTextColor="#8b9cb5"
                        secureTextEntry={true}
                        autoComplete="password-new"
                        returnKeyType="next"
                        ref={passwordRef}
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
                    <Text style={styles.buttonTextStyle}>LOGIN</Text>
                </TouchableOpacity>
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

export default Login;