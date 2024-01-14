import React, { useEffect, useState } from 'react';
import { stringToColor } from '../../utils/utils';

function AvatarIcon({ name = 'Simple Draw', img = null, radius = '25px' }) {
  const [avatarName, setAvatarName] = useState('');
  const [avatarColor, setAvatarColor] = useState('');

  useEffect(() => {
    if (!img) {
      setAvatarColor(stringToColor(name));
      if (name) {
        let splitStr = name.split(' ');
        //console.log(splitStr)
        if (splitStr.length > 1) {
          setAvatarName(splitStr[0][0].toUpperCase() + splitStr[1][0].toUpperCase());
        } else {
          setAvatarName(splitStr[0][0].toUpperCase() + splitStr[0][1] ?? '');
        }
      }
    }
  });

  return (
    <div
      style={{ backgroundColor: avatarColor, width: radius, height: radius }}
      className=" rounded-full overflow-hidden"
    >
      <div className="h-full flex justify-center items-center font-semibold text-sm text-white ">
        {avatarName}
      </div>
    </div>
  );
}

export default AvatarIcon;
