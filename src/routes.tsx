import { createBrowserRouter } from 'react-router-dom';
import SidebarLayout from './layout/SideLayout';
import PlainLayout from './layout/PlainLayout';
import { ErrorWithSidebar } from './layout/ErrorWithSidebar';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import VerifyOtp from './pages/VerifyOtp/VerifyOtp';
import NotFound from './pages/NotFound';
import About from './pages/About/About';
import ChatPage from './pages/Chat/Chat';
import Signup from './pages/Signup/Signup';
import History from './pages/History/History';
import Settings from './pages/Settings/Settings';
import ComingSoon from './pages/ComingSoon/ComingSoon';
import Discover from './pages/discovery/discover';
import Wallet from './pages/wallet/wallet';

export const router = createBrowserRouter([
  // Home route with PlainLayout
  {
    path: '/',
    element: <PlainLayout />,
    children: [{ index: true, element: <Home /> }],
  }, // Auth routes with PlainLayout
  {
    path: '/',
    element: <PlainLayout />,
    children: [
      { path: 'sign-up', element: <Signup /> },
      { path: 'verify-otp', element: <VerifyOtp /> },
    ],
  },
  // Routes with SidebarLayout (main app routes)
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <SidebarLayout />
      </ProtectedRoute>
    ),
    errorElement: (
      <ErrorWithSidebar>
        <NotFound />
      </ErrorWithSidebar>
    ),
    children: [
      {
        path: 'about',
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: 'chat',
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'history',
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'soon',
        element: (
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        ),
      },
      {
        path: 'discover',
        element: (
          <ProtectedRoute>
            <Discover />
          </ProtectedRoute>
        ),
      },
      {
        path: 'wallet',
        element: (
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
