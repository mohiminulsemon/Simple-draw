import React, { useState } from 'react';
import { SimpleBorder, IconInput, BasicButton } from '..';
import { routes } from '../../utils/routes';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/utils';

function SignupForm() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [username, setUsername] = useState('');
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState('');

  const [signupErrorMessage, setSignupErrorMessage] = useState('');

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  // handle username update
  const handleUsernameChange = (value) => {
    setUsername(value);
    checkUsername(value);
  };
  const checkUsername = (value) => {
    let isVaild = true;
    if (value) {
      setUsernameErrorMessage('');
    } else {
      setUsernameErrorMessage('ユーザー名を入力してください。');
      isVaild = false;
    }
    return isVaild;
  };

  // handle email update
  const handleEmailChange = (value) => {
    setEmail(value);
    checkEmail(value);
  };
  const checkEmail = (value) => {
    let isVaild = true;
    if (value) {
      const isEmail = validateEmail(value);
      setEmailErrorMessage(isEmail ? '' : 'メールアドレスを入力してください。');
      isVaild = isEmail;
    } else {
      setEmailErrorMessage('メールアドレスを入力してください。');
      isVaild = false;
    }
    return isVaild;
  };

  // handle password update
  const handlePasswordChange = (value) => {
    setPassword(value);
    checkPassword(value);
  };
  const checkPassword = (value) => {
    let isVaild = true;
    if (value) {
      const vaildPassword = validatePassword(value);
      setPasswordErrorMessage(
        vaildPassword ? '' : 'パスワードは8文字以上の英数字を含む必要があります。'
      );
      isVaild = vaildPassword;
    } else {
      setPasswordErrorMessage('パスワードを入力してください。');
      isVaild = false;
    }
    return isVaild;
  };

  // handle password confirmation update
  const handlePasswordConfirmChange = (value) => {
    setPasswordConfirm(value);
    checkPasswordConfirm(value);
  };
  const checkPasswordConfirm = (value) => {
    let isVaild = true;
    if (value == '') {
      setPasswordConfirmErrorMessage('パスワードをもう一度入力してください。');
      isVaild = false;
    } else if (value !== password) {
      setPasswordConfirmErrorMessage('パスワードは一致していない。');
      isVaild = false;
    } else {
      setPasswordConfirmErrorMessage('');
    }
    return isVaild;
  };

  const checkUserInput = () => {
    setUsernameErrorMessage('');
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
    setPasswordConfirmErrorMessage('');
    setSignupErrorMessage('');

    const isVaildUsername = checkUsername(username);
    const isVaildEmail = checkEmail(email);
    const isVaildPassword = checkPassword(password);
    const isVaildPasswordConfirm = checkPasswordConfirm(passwordConfirm);

    return isVaildUsername && isVaildEmail && isVaildPassword && isVaildPasswordConfirm;
  };

  const handleSignup = (event) => {
    event.preventDefault();
    if (checkUserInput()) {
      console.log('signup start');
      console.log('username :>> ', username);
      console.log('email :>> ', email);
      console.log('password :>> ', password);
      console.log('passwordConfirm :>> ', passwordConfirm);
    }
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div className="w-screen md:w-[500px] h-auto p-2">
      <div
        className="w-full rounded-md bg-zinc-100 dark:bg-zinc-700 
            text-zinc-700 dark:text-zinc-100 
            shadow-[0_0_5px_2px] shadow-zinc-300 dark:shadow-zinc-500"
      >
        <div className="w-full flex flex-col justify-center items-center py-4">
          {/* title */}
          <div className="text-3xl font-bold">Signup</div>
          <div className="my-2 text-sm">Simple Draw新規ユーザー登録</div>

          {/* border */}
          <div className="w-[90%] my-2">
            <SimpleBorder />
          </div>

          {/* user name input */}
          <div className="w-[80%] md:w-[70%] my-1">
            <IconInput
              errorMessage={usernameErrorMessage}
              onChange={handleUsernameChange}
              placeholder="Username"
              icon={<i className="fa-solid fa-user"></i>}
            />
          </div>

          {/* email input */}
          <div className="w-[80%] md:w-[70%] my-1">
            <IconInput
              errorMessage={emailErrorMessage}
              onChange={handleEmailChange}
              placeholder="Email"
              icon={<i className="fa-solid fa-envelope"></i>}
            />
          </div>

          {/* password input */}
          <div className="w-[80%] md:w-[70%] my-1">
            <IconInput
              errorMessage={passwordErrorMessage}
              onChange={handlePasswordChange}
              type="password"
              placeholder="Password"
              icon={<i className="fa-solid fa-key"></i>}
            />
          </div>

          {/* confirm password input */}
          <div className="w-[80%] md:w-[70%] my-1">
            <IconInput
              errorMessage={passwordConfirmErrorMessage}
              onChange={handlePasswordConfirmChange}
              type="password"
              placeholder="Password Confirmation"
              icon={<i className="fa-solid fa-lock"></i>}
            />
          </div>

          {/* login redirect*/}
          <div className="w-[80%] md:w-[70%] flex justify-end">
            <Link
              to={routes.login}
              className="hover:text-indigo-500 hover:underline cursor-pointer"
            >
              Login
            </Link>
          </div>

          {/* signup error message */}
          {signupErrorMessage && (
            <div className="w-[80%] text-sm text-red-500 text-center">{signupErrorMessage}</div>
          )}
          {/* register button */}
          <div className="w-[60%] my-2">
            <BasicButton onClick={handleSignup} label="サインアップ" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
