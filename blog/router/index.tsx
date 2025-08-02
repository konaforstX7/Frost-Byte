import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/index';
import AuthPageNew from '../pages/AuthPageNew';
import RegisterPage from '../pages/RegisterPage';
import TestPage from '../pages/TestPage';
import KeyboardTestVite from '../pages/keyboard-test-vite';
import MinimalKeyboardTest from '../minimal-keyboard-test';

const router = createBrowserRouter([
  {
    path: '/minimal-keyboard-test',
    element: <MinimalKeyboardTest />,
  },
  {
    path: '/keyboard-test',
    element: <KeyboardTestVite />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth',
    element: <AuthPageNew />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
]);

export default router;