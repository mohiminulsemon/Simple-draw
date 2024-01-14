import React, { useEffect, useState } from 'react';
import { IconButton, SimpleBorder } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { openSidebar, setScreenSize } from '../../features/appSlice';
import { Link } from 'react-router-dom';
import { routes } from '../../utils/routes';

function AppSidebar() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [isHover, setIsHover] = useState(false);

  const isSidebarOpen = useSelector((state) => state.persist.appReducer.isSidebarOpen);
  const dispatch = useDispatch();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleToggleButtonClick = (event) => {
    event.preventDefault();
    dispatch(openSidebar(!isSidebarOpen));
    setIsHover(false);
    console.log(isSidebarOpen);
  };

  const handleSidebarHover = (value) => {
    if (!isSidebarOpen) {
      setIsHover(value);
    }
  };

  // // handle window resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     const screenSize = {
  //       x: window.innerWidth,
  //       y: window.innerHeight
  //     };
  //     dispatch(setScreenSize(screenSize));
  //   };
  //   handleResize();

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      <div
        onMouseEnter={(e) => handleSidebarHover(true)}
        onMouseLeave={(e) => handleSidebarHover(false)}
        className={
          (isHover ? 'shadow-[2px_0_5px_2px] dark:shadow-zinc-700 shadow-zinc-200 ' : ' ') +
          (isSidebarOpen || isHover ? 'w-[250px] ' : 'w-[28px]') +
          ' h-[calc(100vh-45px)] overflow-y-auto overflow-x-hidden ' +
          ' bg-white dark:bg-zinc-600 rounded-e-md relative ease-out duration-75'
        }
      >
        {/* toggle button */}

        <div
          onClick={(e) => handleToggleButtonClick(e)}
          className="absolute right-0 rounded-bl-md h-[35px] w-[28px] text-xs cursor-pointer
             dark:bg-zinc-700/40 hover:dark:bg-zinc-700 bg-indigo-100/60 hover:bg-indigo-200
            flex justify-center items-center dark:text-zinc-100 text-zinc-600"
        >
          <i
            className={
              (isSidebarOpen ? 'rotate-0 ' : 'rotate-180') +
              ' fa-solid fa-chevron-left origin-center ease-in-out duration-200'
            }
          ></i>
        </div>

        <div className="">
          {/* sidebar content */}
          {(isHover || isSidebarOpen) && (
            <div className="mt-[42px] px-2">
              <div className="mb-2">
                <SimpleBorder />
              </div>

              <div className="space-y-2">
                <Link to={routes.home}>
                  <IconButton
                    height="35px"
                    label="ホーム"
                    icon={<i className="fa-solid fa-house-chimney"></i>}
                  />
                </Link>

                <Link to={routes.project}>
                  <IconButton
                    height="35px"
                    label="プロジェクト一覧"
                    icon={<i className="fa-solid fa-diagram-project"></i>}
                  />
                </Link>

                <Link to={routes.template}>
                  <IconButton
                    height="35px"
                    label="テンプレート"
                    icon={<i className="fa-solid fa-newspaper"></i>}
                  />
                </Link>

                <Link to={routes.manual}>
                  <IconButton
                    height="35px"
                    label="ご利用方法"
                    icon={<i className="fa-solid fa-receipt"></i>}
                  />
                </Link>

                <Link to={routes.canvas}>
                  <IconButton
                    height="35px"
                    label="Canvas"
                    icon={<i className="fa-solid fa-broom-ball"></i>}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppSidebar;
