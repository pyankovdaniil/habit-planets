import { Box, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { InputLabel } from '@mui/material';
import { Link } from "react-router-dom";

const FULLNAME_MIN_LENGTH = 3;
const FULLNAME_MAX_LENGTH = 40;
const EMAIL_MIN_LENGTH = 6;
const EMAIL_MAX_LENGTH = 45;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 150;

const FULLNAME_REGEX = /^([a-zA-Zа-яА-Я]{2,})+\s+([a-zA-Zа-яА-Я\s]{2,})+$/i;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,19}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,150}/;

const SignUp = () => {
    const userRef = useRef();

    const [fullName, setFullName] = useState('');
    const [isValidFullName, setIsValidFullName] = useState(false);
    const [isFullNameInFocus, setIsFullNameInFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isEmailInFocus, setIsEmailInFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isUsernameInFocus, setIsUsernameInFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isPasswordInFocus, setIsPasswordInFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [isValidMatchPassword, setIsValidMatchPassword] = useState(false);
    const [isMatchPasswordInFocus, setIsMatchPasswordInFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        if (fullName.length < FULLNAME_MIN_LENGTH
            || fullName.length > FULLNAME_MAX_LENGTH) {
            setIsValidFullName(false);
        } else {
            setIsValidFullName(FULLNAME_REGEX.test(fullName));
        }
    }, [fullName]);

    useEffect(() => {
        if (email.length < EMAIL_MIN_LENGTH
            || email.length > EMAIL_MAX_LENGTH) {
            setIsValidEmail(false);
        } else {
            setIsValidEmail(EMAIL_REGEX.test(email));
        }
    }, [email]);

    useEffect(() => {
        async function isUsernameUnique(username) {
            const response = await fetch(`http://localhost:8080/check-username/${username}`);
            const data = await response.json();
            return data.message === "Not found";
        }

        if (username.length < USERNAME_MIN_LENGTH
            || username.length > USERNAME_MAX_LENGTH) {
            setIsValidUsername(false);
        } else if (USERNAME_REGEX.test(username)) {
            isUsernameUnique(username).then(data => setIsValidUsername(data));
        } else {
            setIsValidUsername(false);
        }

    }, [username]);

    useEffect(() => {
        if (password.length < PASSWORD_MIN_LENGTH
            || password.length > PASSWORD_MAX_LENGTH) {
            setIsValidPassword(false);
        } else {
            setIsValidPassword(PASSWORD_REGEX.test(password));
            setIsValidMatchPassword(password === matchPassword);
        }
    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessage('');
    }, [fullName, email, username, password, matchPassword])

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const data = {
            fullName: fullName,
            email: email,
            username: username,
            password: password
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
                'Access-Control-Max-Age': 86400
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('http://localhost:8080/register', requestOptions);

        if (response.status === 200) {
            setIsSuccessRegistration(true);
        } else {
            alert("Ошибка регистрации. Возможно, такой юзернейм уже занят. Попробуйте еще раз!")
        }
    }

    return (
        <Box className="sign-up-page">
            <Box className="sign-up-container">
                <Box className="sign-up-info-box">

                </Box>

                <>
                    {isSuccessRegistration ? (
                        <Box className="sign-up-form-box">
                            <h1 className="centered sign-up-success-message">
                                Вы были успешно зарегистрированы!
                                <p className="sign-up-success-redirect-message">
                                    <Link className="sign-in-form-link" to="/sign-in">
                                        Войдите
                                    </Link>
                                    в свой новый аккаунт :)
                                </p>
                            </h1>
                        </Box>
                    ) : (
                        <Box className="sign-up-form-box">
                            <Box className="sign-up-navigation">
                                <h1 className="centered sign-up-welcome-message">
                                    Создайте аккаунт
                                    <p className="sign-up-redirect-message">
                                        <Link className="sign-in-form-link" to="/sign-in">
                                            Войти
                                        </Link>
                                        вместо этого?
                                    </p>
                                </h1>
                            </Box>

                            <form onSubmit={onFormSubmit}>
                                <Box className="sign-up-field-box">
                                    <InputLabel
                                        shrink
                                        htmlFor='fullName'>
                                        Введите полное имя:
                                        <span className={isValidFullName ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>

                                        <span className={(isValidFullName || !fullName) ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </InputLabel>

                                    <TextField
                                        type="text"
                                        size="small"
                                        fullWidth
                                        color="secondary"
                                        id="fullName"
                                        ref={userRef}
                                        autoFocus
                                        autoComplete="off"
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        aria-invalid={isValidFullName ? "false" : "true"}
                                        aria-describedby="full-name-sign-up-note"
                                        onFocus={() => setIsFullNameInFocus(true)}
                                        onBlur={() => setIsFullNameInFocus(false)}
                                        label="Полное имя"
                                        variant="outlined"
                                    />
                                    <p id="full-name-sign-up-note"
                                        className={(isFullNameInFocus && fullName && !isValidFullName) ? "instructions" : "hide"}>
                                        <span className="instructions-icon">
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                        </span>
                                        Пожалуйста, введите фамилию и имя через пробел.<br />
                                        Фамилия и имя должны состоять только из букв.<br />
                                        Длина имени и фамилии как минимум 2 символа.<br />
                                    </p>
                                </Box>

                                <Box className="sign-up-field-box">
                                    <InputLabel
                                        shrink
                                        htmlFor='email'>
                                        Введите электронную почту:
                                        <span className={isValidEmail ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>

                                        <span className={(isValidEmail || !email) ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </InputLabel>

                                    <TextField
                                        type="email"
                                        size="small"
                                        fullWidth
                                        color="secondary"
                                        id="email"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        aria-invalid={isValidEmail ? "false" : "true"}
                                        aria-describedby="email-sign-up-note"
                                        onFocus={() => setIsEmailInFocus(true)}
                                        onBlur={() => setIsEmailInFocus(false)}
                                        label="Электронная почта"
                                        variant="outlined"
                                    />
                                    <p id="email-sign-up-note"
                                        className={(isEmailInFocus && email && !isValidEmail) ? "instructions" : "hide"}>
                                        <span className="instructions-icon">
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                        </span>
                                        Пожалуйста, введите существующую и корректную электронную почту.<br />
                                        Длина электронной почты должна быть от 6 до 45 символов.<br />
                                    </p>
                                </Box>

                                <Box className="sign-up-field-box">
                                    <InputLabel
                                        shrink
                                        htmlFor='username'>
                                        Введите имя пользователя:
                                        <span className={isValidUsername ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>

                                        <span className={(isValidUsername || !username) ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </InputLabel>

                                    <TextField
                                        type="text"
                                        size="small"
                                        fullWidth
                                        color="secondary"
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        aria-invalid={isValidUsername ? "false" : "true"}
                                        aria-describedby="username-sign-up-note"
                                        onFocus={() => setIsUsernameInFocus(true)}
                                        onBlur={() => setIsUsernameInFocus(false)}
                                        label="Имя пользователя"
                                        variant="outlined"
                                    />
                                    <p id="username-sign-up-note"
                                        className={(isUsernameInFocus && username && !isValidUsername) ? "instructions" : "hide"}>
                                        <span className="instructions-icon">
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                        </span>
                                        Пожалуйста, введите уникальное имя пользователя.<br />
                                        Имя пользователя может состоять только из букв и символов _ и -<br />
                                        Длина имени пользователя от 3 до 20 символов.<br />
                                        Если вы ввели корректное имя и видите этот текст, значит такое имя пользователя занято.<br />
                                    </p>
                                </Box>

                                <Box className="sign-up-field-box">
                                    <InputLabel
                                        shrink
                                        htmlFor='password'>
                                        Введите пароль:
                                        <span className={isValidPassword ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>

                                        <span className={(isValidPassword || !password) ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </InputLabel>

                                    <TextField
                                        type="password"
                                        size="small"
                                        fullWidth
                                        color="secondary"
                                        id="password"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        aria-invalid={isValidPassword ? "false" : "true"}
                                        aria-describedby="password-sign-up-note"
                                        onFocus={() => setIsPasswordInFocus(true)}
                                        onBlur={() => setIsPasswordInFocus(false)}
                                        label="Пароль"
                                        variant="outlined"
                                    />
                                    <p id="password-sign-up-note"
                                        className={(isPasswordInFocus && password && !isValidPassword) ? "instructions" : "hide"}>
                                        <span className="instructions-icon">
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                        </span>
                                        Длина пароля должна быть от 6 до 150 символов.<br />
                                        В пароле должна быть хотя бы одна строчная и заглавная латинская буква а так же один из символов: !@#$%<br />
                                    </p>
                                </Box>

                                <Box className="sign-up-field-box">
                                    <InputLabel
                                        shrink
                                        htmlFor='match-password'>
                                        Повторите пароль:
                                        <span className={(isValidMatchPassword && matchPassword) ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>

                                        <span className={(isValidMatchPassword || !matchPassword) ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </InputLabel>

                                    <TextField
                                        type="password"
                                        size="small"
                                        fullWidth
                                        color="secondary"
                                        id="match-password"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setMatchPassword(e.target.value)}
                                        required
                                        aria-invalid={isValidMatchPassword ? "false" : "true"}
                                        aria-describedby="match-password-sign-up-note"
                                        onFocus={() => setIsMatchPasswordInFocus(true)}
                                        onBlur={() => setIsMatchPasswordInFocus(false)}
                                        label="Повторите пароль"
                                        variant="outlined"
                                    />
                                    <p id="match-password-sign-up-note"
                                        className={(isMatchPasswordInFocus && !isValidMatchPassword) ? "instructions" : "hide"}>
                                        <span className="instructions-icon">
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                        </span>
                                        Пароли должны совпадать.<br />
                                    </p>
                                </Box>

                                <Button className="sign-up-button" variant="contained" fullWidth
                                    color="secondary" type="submit" disabled={!isValidFullName || !isValidEmail
                                        || !isValidUsername || !isValidPassword || !isValidMatchPassword}>
                                    Зарегистрироваться!
                                </Button>
                            </form>
                        </Box>
                    )}
                </>
            </Box>
        </Box>
    )
}

export default SignUp
