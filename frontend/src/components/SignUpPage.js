import React from "react";
import {useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function SignUpPage() {
  const fullNameMinLength = 3;
  const fullNameMaxLength = 40;
  const emailMinLength = 6;
  const emailMaxLength = 45;
  const usernameMinLength = 3;
  const usernameMaxLength = 20;
  const passwordMinLength = 6;
  const passwordMaxLength = 150;

  const {
    register, formState: {
      errors,
      isValid,
    }, handleSubmit,
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = async (data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    const response = await fetch('http://localhost:8080/register', requestOptions);
    const responseData = await response.json();
    
    if (responseData === "OK") {
      window.location.assign('http://localhost:3000/sign-in')
    } else {
      alert("Ошибка регистрации. Возможно, такой юзернейм уже занят. Попробуйте еще раз!")
    }
  }

  const isUsernameUnique = async (username) => {
    const response = await fetch(`http://localhost:8080/check-username/${username}`);
    const data = await response.json();
    return data.message === "Not found";
  }

  return (
    <div className="SignUpPage">
      <Box id="sign-up-main-container">
        <Box id="sign-up-info-box">
          <img src="../images/planets/TERRAIN_WET.png" id="sign-up-rotating-planet" alt="Spinning planet"></img>
        </Box>

        <Box id="sign-up-form-box">
          <Box>
            <h1 class="centered" id="sign-up-welcome-message">
              Создайте аккаунт
              <p id="sign-up-redirect-message">
                <Link id="sign-in-form-link" to="/sign-in">
                  Войти
                </Link>
                вместо этого?
              </p>
            </h1>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box class="sign-up-field-box centered">
              <TextField size="small" fullWidth id="fullName" label="Как вас называть?"
                variant="outlined" color="secondary" {...register("fullName", {
                  required: "Обязательно введите имя!",
                  minLength: {
                    value: fullNameMinLength,
                    message: `Минимальная длина имени - ${fullNameMinLength} символов!`
                  },
                  maxLength: {
                    value: fullNameMaxLength,
                    message: `Максимальная длина имени - ${fullNameMaxLength} символов!`
                  }
                })}/>
            </Box>

            <Box class="sign-up-field-error-box centered">
              {
                errors?.fullName &&
                <p class="sign-up-field-error-message">
                  {errors?.fullName?.message || "Ошибка валидации имени!"}
                </p>
              }
            </Box>

            <Box class="sign-up-field-box centered">
              <TextField size="small" fullWidth id="email" label="Электронная почта"
                variant="outlined" color="secondary" {...register("email", {
                  required: "Обязательно введите email!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                    message: "Введите корректный email!"
                  },
                  minLength: {
                    value: emailMinLength,
                    message: `Минимальная длина почты - ${emailMinLength} символов!`
                  },
                  maxLength: {
                    value: emailMaxLength,
                    message: `Максимальная длина почты - ${emailMaxLength} символов!`
                  }
                })}/>
            </Box>

            <Box class="sign-up-field-error-box centered">
              {
                errors?.email &&
                <p class="sign-up-field-error-message">
                  {errors?.email?.message || "Ошибка валидации почты!"}
                </p>
              }
            </Box>

            <Box class="sign-up-field-box centered">
              <TextField size="small" fullWidth id="username" label="Юзернейм"
                variant="outlined" color="secondary" {...register("username", {
                  required: "Обязательно введите юзернейм!",
                  validate: value => isUsernameUnique(value),
                  pattern: {
                    value: /^[a-z0-9_-]*$/,
                    message: "Введите корректный юзернейм!"
                  },
                  minLength: {
                    value: usernameMinLength,
                    message: `Минимальная длина юзернейма - ${usernameMinLength} символов!`
                  },
                  maxLength: {
                    value: usernameMaxLength,
                    message: `Максимальная длина юзернейма - ${usernameMaxLength} символов!`
                  }
                })}/>
            </Box>

            <Box class="sign-up-field-error-box centered">
              {
                errors?.username &&
                <p class="sign-up-field-error-message">
                  {errors?.username?.message || "Такой юзернейм уже занят :("}
                </p>
              }
            </Box>

            <Box class="sign-up-field-box centered">
              <TextField size="small" fullWidth id="password" label="Пароль" type="password"
                variant="outlined" color="secondary" {...register("password", {
                  required: "Обязательно введите пароль!",
                  minLength: {
                    value: passwordMinLength,
                    message: `Минимальная длина пароля - ${passwordMinLength} символов!`
                  },
                  maxLength: {
                    value: passwordMaxLength,
                    message: `Максимальная длина пароля - ${passwordMaxLength} символов!`
                  }
                })}/>
            </Box>

            <Box class="sign-up-field-error-box centered">
              {
                errors?.password &&
                <p class="sign-up-field-error-message">
                  {errors?.password?.message || "Ошибка валидации пароля!"}
                </p>
              }
            </Box>

            <Box>
              <Button id="sign-up-button" variant="contained" 
                color="secondary" type="submit" disabled={!isValid}>
                Зарегистрироваться!
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default SignUpPage;
