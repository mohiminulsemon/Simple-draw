import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarIcon, IconButton, SimpleBorder } from '..';
import { updateUser, updateUserAuth } from '../../features/authSlice';

function UserProfileModal() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const user = useSelector((state) => state.persist.authReducer.user);
  const dispatch = useDispatch();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleLogout = (event) => {
    event.preventDefault();

    console.log('logout start');

    /**
     * Todo :if has any logout api, call logout api
     */

    // update user
    dispatch(updateUser({ name: '', email: '' }));
    dispatch(updateUserAuth(false));
  };

  // ------------------------------------------------------------------------------
  // renders
  // ------------------------------------------------------------------------------
  return (
    <div
      className="w-[200px] h-auto bg-zinc-50 dark:bg-zinc-700
        text-zinc-600 dark:text-zinc-100 rounded-md shadow-md 
        absolute bottom-100 right-0 mt-2 animate-fade-in-right z-20"
    >
      <div className="py-2 px-5 flex">
        <AvatarIcon name={user.name} />
        <div className="ms-3">{user.name}</div>
      </div>

      <SimpleBorder />

      <div className="p-2 space-y-1">
        <IconButton label="プロフィール" icon={<i className="fa-solid fa-user"></i>} />
        <IconButton
          onClick={handleLogout}
          label="ログアウト"
          icon={<i className="fa-solid fa-right-from-bracket"></i>}
        />
      </div>
    </div>
  );
}

export default UserProfileModal;
