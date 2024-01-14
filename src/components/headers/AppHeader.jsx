import React from 'react';
import { Link } from 'react-router-dom';
import { AppLogo, ThemeModeButton, UserProfileButton } from '..';
import { routes } from '../../utils/routes';

function AppHeader() {
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div className="w-full h-[45px] flex justify-between items-center px-3">
      {/* header left */}
      <div>
        <Link to={routes.home}>
          <AppLogo />
        </Link>
      </div>

      {/* header right */}
      <div className="flex items-center space-x-2">
        {/* theme switch button */}
        <ThemeModeButton />

        {/* user button */}
        <UserProfileButton />
      </div>
    </div>
  );
}

export default AppHeader;
