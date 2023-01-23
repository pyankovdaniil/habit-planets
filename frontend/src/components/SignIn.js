import React, { useEffect, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from "../api/axios";
import useAuth from '../hooks/useAuth';

const LOGIN_URL = '/sign-in';

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 150;

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,19}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,150}/;

const SignIn = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/my-habits";

    const userRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isUsernameInFocus, setIsUsernameInFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isPasswordInFocus, setIsPasswordInFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        if (username.length < USERNAME_MIN_LENGTH
            || username.length > USERNAME_MAX_LENGTH) {
            setIsValidUsername(false);
        } else {
            setIsValidUsername(USERNAME_REGEX.test(username));
        }

    }, [username]);

    useEffect(() => {
        if (password.length < PASSWORD_MIN_LENGTH
            || password.length > PASSWORD_MAX_LENGTH) {
            setIsValidPassword(false);
        } else {
            setIsValidPassword(PASSWORD_REGEX.test(password));
        }
    }, [password]);

    useEffect(() => {
        setErrorMessage('');
    }, [username, password]);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password
        };

        try {
            setUsername('');
            setPassword('');
            setErrorMessage('');

            const response = await axios.post(LOGIN_URL, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
                    'Access-Control-Max-Age': 86400
                },
            });

            const jwt = response?.data?.message;
            setAuth({ username, password, jwt });
            console.log(username + ' ' + password + ' ' + jwt);
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrorMessage("Нет ответа от сервера...");
            } else {
                setErrorMessage("Неверные логин и пароль!");
            }
            errorRef.current.focus();
        }
    }

    return (
        <Box className="sign-in-page">
            <Box className="sign-in-container">
                <Box className="sign-up-navigation">
                    <h1 className="centered sign-in-welcome-message">
                        Войдите в аккаунт
                        <p className="sign-in-redirect-message">
                            <Link className="sign-up-form-link" to="/sign-up">
                                Зарегистрироваться
                            </Link>
                            вместо этого?
                        </p>
                    </h1>
                </Box>

                <Box className={errorMessage ? "error-message centered" : "hide"}>
                    <p ref={errorRef}
                        aria-live="assertive">
                        {errorMessage}
                    </p>
                </Box>

                <form onSubmit={onFormSubmit}>
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
                            value={username}
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
                            Пожалуйста, введите корректное имя пользователя.<br />
                            Имя пользователя может состоять только из букв и символов _ и -<br />
                            Длина имени пользователя от 3 до 20 символов.<br />
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
                            value={password}
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

                    <Button variant="contained" fullWidth
                        color="secondary" type="submit" disabled={!isValidUsername || !isValidPassword}>
                        Войти!
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default SignIn
