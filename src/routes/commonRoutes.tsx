import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { RestrictedLayout } from '../layouts/RestrictedLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { LoadingFallback } from '../components/LoadingFallback';

const Home = lazy(() => import('../pages/Home'));

export const commonRoutes = [
  <Route 
    key="home" 
    path="/home" 
    element={
      <ProtectedRoute>
        <RestrictedLayout>
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        </RestrictedLayout>
      </ProtectedRoute>
    } 
  />
];