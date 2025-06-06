import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import SidebarLayout from './layout/SideLayout';
import PlainLayout from './layout/PlainLayout';
import { ErrorWithSidebar } from './layout/ErrorWithSidebar';
import { ProtectedRoute } from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Chat = lazy(() => import('./pages/Chat/Chat'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ComingSoon = lazy(() => import('./pages/ComingSoon/ComingSoon'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const VerifyOtp = lazy(() => import('./pages/VerifyOtp/VerifyOtp'));
const History = lazy(() => import('./pages/History/History'));
const Wallet = lazy(() => import('./pages/wallet/wallet'));
const Discovery = lazy(() => import('./pages/discovery/discovery'));
const Settings = lazy(() => import('./pages/Settings/Settings'));

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
            <Chat />
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
            <Discovery />
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
