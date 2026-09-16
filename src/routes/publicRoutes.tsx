import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { LoadingFallback } from '../components/LoadingFallback';
import { RootRedirect } from './RootRedirect';
import { GuestRoute } from './GuestRoute';

const Login = lazy(() => import('@pages/Login'));
const Unauthorized = lazy(() => import('@pages/Unauthorized'));
const NotFound = lazy(() => import('@pages/NotFound'));

export const publicRoutes = [
  <Route key="root" path="/" element={<RootRedirect />} />,
  <Route 
    key="login" 
    path="/login" 
    element={
      <GuestRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Login />
        </Suspense>
      </GuestRoute>
    } 
  />,
  <Route 
    key="unauthorized" 
    path="/unauthorized" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Unauthorized />
      </Suspense>
    } 
  />,
  <Route 
    key="not-found" 
    path="*" 
    element={
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    } 
  />,
];