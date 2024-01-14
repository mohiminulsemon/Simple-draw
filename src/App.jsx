import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './utils/routes';
import {
  HomePage,
  LoginPage,
  Page404,
  SignupPage,
  ProjectPage,
  TemplatePage,
  ManualPage,
  CanvasPage
} from './pages';
import { AppLayout, CanvasLayout } from './components';
import { useEffect } from 'react';
import { setMousePosition, setScreenSize } from './features/appSlice';

function App() {
  const isDarkMode = useSelector((state) => state.persist.appReducer.isDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    // handle window resize
    const handleResize = () => {
      const screenSize = {
        x: window.innerWidth,
        y: window.innerHeight
      };
      dispatch(setScreenSize(screenSize));
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    // handle mouse move
    const handleMouseMove = (event) => {
      const mousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      dispatch(setMousePosition(mousePosition));
    };

    // disable space scroll
    const disableSpaceScroll = (event) => {
      if (event.keyCode == 32 && event.target == document.body) {
        event.preventDefault();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('drag', handleMouseMove);
    window.addEventListener('keydown', disableSpaceScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('drag', handleMouseMove);
      window.removeEventListener('keydown', disableSpaceScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className={isDarkMode ? 'dark' : ''}>
        <Routes>
          {/* public routes */}
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.signup} element={<SignupPage />} />

          {/* protected routes */}
          <Route element={<AppLayout />}>
            <Route path={routes.home} element={<HomePage />} />
            <Route path={routes.project} element={<ProjectPage />} />
            <Route path={routes.template} element={<TemplatePage />} />
            <Route path={routes.manual} element={<ManualPage />} />
          </Route>

          <Route element={<CanvasLayout />}>
            <Route path={routes.canvas} element={<CanvasPage />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
