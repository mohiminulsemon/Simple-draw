import React, { useState } from 'react';
import appIcon from '/icon.svg';
import { AvatarIcon, UserProfileModal } from '..';
import { useSelector } from 'react-redux';

function UserProfileButton() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.persist.authReducer.user);

  // ------------------------------------------------------------------------------
  // renders
  // ------------------------------------------------------------------------------
  return (
    <div className="relative">
      <div
        onClick={(e) => setOpen(!open)}
        className="w-[60px] h-[32px] bg-indigo-100/80 dark:bg-zinc-600
        hover:bg-indigo-200 hover:dark:bg-zinc-500
        flex items-center px-2 me-2 rounded-[4px] cursor-pointer relative"
      >
        <img className="w-[22px] h-[22px]" src={appIcon} alt="Logo" />
        <div className="absolute -right-3">
          <AvatarIcon name={user.name} radius="32px" />
        </div>
      </div>

      {/* dropdown */}
      {open && <UserProfileModal />}
    </div>
  );
}

export default UserProfileButton;
