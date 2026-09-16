import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { RestrictedLayout } from '@layouts/RestrictedLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { LoadingFallback } from '@components/LoadingFallback';
import { UserRoleUtils } from '@features/auth/enums/UserRole';

const ScanCode = lazy(() => import('@pages/members/ScanCode'));

export const memberRoutes = [
  <Route 
    key="scan-code" 
    path="/scan-code" 
    element={
      <ProtectedRoute allowedRoles={UserRoleUtils.members()}>
        <RestrictedLayout>
          <Suspense fallback={<LoadingFallback />}>
            <ScanCode />
          </Suspense>
        </RestrictedLayout>
      </ProtectedRoute>
    } 
  />,
];