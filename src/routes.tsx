import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import SidebarLayout from './layout/SideLayout';
import PlainLayout from './layout/PlainLayout';
import { ErrorWithSidebar } from './layout/ErrorWithSidebar';

// Public Pages
const Home = lazy(() => import('./pages/Home/Home'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const VerifyOtp = lazy(() => import('./pages/VerifyOtp/VerifyOtp'));

// Protected Pages (require SidebarLayout)
const About = lazy(() => import('./pages/About/About'));
const Chat = lazy(() => import('./pages/Chat/Chat'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ComingSoon = lazy(() => import('./pages/ComingSoon/ComingSoon'));
const History = lazy(() => import('./pages/History/History'));
const Wallet = lazy(() => import("./pages/wallet/wallet"));
const Discovery = lazy(() => import("./pages/discovery/discovery"))
const Settings = lazy(() => import('./pages/Settings/Settings'));


export const router = createBrowserRouter([
  // Public Routes (No Sidebar)
  {
    path: '/',
    element: <PlainLayout />,
    errorElement: (
      <ErrorWithSidebar>
        <NotFound />
      </ErrorWithSidebar>
    ),
    children: [
      { index: true, element: <Home /> }, 
      { path: 'sign-up', element: <Signup /> },
      { path: 'verify-otp', element: <VerifyOtp /> },
    ],
  },
  
  // Protected Routes (With Sidebar)
  {
    path: '/app',
    element: <SidebarLayout />,
    errorElement: (
      <ErrorWithSidebar>
        <NotFound />
      </ErrorWithSidebar>
    ),
    children: [
      { path: 'about', element: <About /> },
      { path: 'chat', element: <Chat /> },
      { path: 'history', element: <History /> },
      { path: 'settings', element: <Settings /> },
      { path: 'soon', element: <ComingSoon /> },
      { path: 'discover', element: <Discovery /> },
      { path: 'wallet', element: <Wallet /> }
    ],
  },
  
  // Redirect all unmatched routes to Home
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);