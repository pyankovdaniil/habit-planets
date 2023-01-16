import React from "react";
import {useForm} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";


function SignInPage() {
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
    alert(JSON.stringify(data));
  }


  return (
    <div className="SignInPage">
      <Box id="sign-in-main-container">
        <Box>
          <h1 class="centered" id="sign-in-welcome-message">
            Войдите в аккаунт
            <p id="sign-in-redirect-message">
              <Link id="sign-up-form-link" to="/sign-up">
                Создать аккаунт
              </Link>
              вместо этого?
            </p>
          </h1>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Box class="sign-up-field-box centered">
              <TextField size="small" fullWidth id="username" label="Юзернейм?"
                variant="outlined" color="primary" {...register("username", {
                  required: "Обязательно введите юзернейм!",
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
                  {errors?.username?.message || "Ошибка валидации юзернейма!"}
                </p>
              }
            </Box>

            <Box class="sign-up-field-box centered">
              <TextField size="small" fullWidth id="password" label="Пароль" type="password"
                variant="outlined" color="primary" {...register("password", {
                  required: "Обязательно введите email!",
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
                  {errors?.password?.message || "Ошибка валидации почты!"}
                </p>
              }
            </Box>

            <Box>
              <Button id="sign-up-button" variant="contained" 
                color="primary" type="submit" disabled={!isValid}>
                Зарегистрироваться!
              </Button>
            </Box>
          </form>
      </Box>
    </div>
  );
}

export default SignInPage;
