import React, { useEffect, useState } from 'react';
import { LoadingButton, IconInput, SimpleBorder } from '..';
import { Link } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { useUserLoginMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { updateUser, updateUserAuth } from '../../features/authSlice';

function LoginForm() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [username, setUsername] = useState('');
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const [userLogin, { isLoading, isError }] = useUserLoginMutation();
  const dispatch = useDispatch();
  // const { data, isLoading, error } = useGetBitcoinDataQuery(null, {
  //   pollingInterval: 5000
  // });

  // console.log(data);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const checkUserInput = () => {
    let result = true;
    setUsernameErrorMessage('');
    setPasswordErrorMessage('');
    setLoginErrorMessage('');

    if (!username) {
      setUsernameErrorMessage('ユーザーを入力してください。');
      result = false;
    }

    if (!password) {
      setPasswordErrorMessage('パスワードを入力してください。');
      result = false;
    }
    return result;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('login start');
    console.log('username :>> ', username);
    console.log('password :>> ', password);

    // check all user input before call login api
    const result = checkUserInput();

    // if all input is vaild
    if (result) {
      // prepare the request body
      let requestBody = {
        userName: username,
        userPwd: password
      };

      // call login api
      userLogin(requestBody).then((res) => {
        /**
         * currently using simpledarw node.js backend
         * Todo: may change the backend in future
         */
        if (res.error) {
          // if (res.error.status == 400) {
          //   setLoginErrorMessage('ログイン情報は間違いでます。');
          // }
          /**
           * if login is not succcess
           * set login error message
           * this logic will be change while backend change
           */
          if (res.error.data === 'Incorrect Username and/or Password!') {
            setLoginErrorMessage(res.error.data);
          } else {
            /**
             * update user state
             * normaly the paramter of updateUser sholud be res.data
             * but this api endpoint does not return json data
             */
            let responseData = {
              name: username,
              email: username + '@gmail.com'
            };
            dispatch(updateUser(responseData));
            dispatch(updateUserAuth(true));
          }
        } else {
          console.log(res);
        }
        console.log('loginApi result :>> ', res);
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      handleLogin(event);
    }
  };

  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeyPress);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, []);

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
          <div className="text-3xl font-bold">Login</div>
          <div className="my-2 text-sm">Simple Drawにログイン</div>

          {/* border */}
          <div className="w-[90%] my-2">
            <SimpleBorder />
          </div>

          <form className="w-full flex flex-col justify-center items-center" onSubmit={handleLogin}>
            {/* user name input */}
            <div className="w-[80%] md:w-[70%] my-1">
              <IconInput
                errorMessage={usernameErrorMessage}
                onChange={handleUsernameChange}
                onKeyDown={handleKeyDown}
                placeholder="Username"
                icon={<i className="fa-solid fa-user"></i>}
              />
            </div>

            {/* password input */}
            <div className="w-[80%] md:w-[70%] my-1">
              <IconInput
                errorMessage={passwordErrorMessage}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyDown}
                placeholder="Password"
                type="password"
                icon={<i className="fa-solid fa-key"></i>}
              />
            </div>

            {/* signup & forgot password */}
            <div className="w-[80%] md:w-[70%] flex justify-between my-2 text-sm">
              <Link
                to={routes.signup}
                className="hover:text-indigo-500 hover:underline cursor-pointer"
              >
                SignUp
              </Link>
              <div className="hover:text-indigo-500 hover:underline cursor-pointer">
                Forgot Password
              </div>
            </div>

            {/* login error message */}
            {isError && (
              <div className="w-[80%] text-sm text-red-500 text-center">{loginErrorMessage}</div>
            )}

            {/* login button */}
            <div className="w-[60%] my-2">
              <LoadingButton label="ログイン" onClick={handleLogin} isLoading={isLoading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
