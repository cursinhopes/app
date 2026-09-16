import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { RestrictedLayout } from '../layouts/RestrictedLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { UserRole } from '../features/auth/enums/UserRole';
import { LoadingFallback } from '@/components/LoadingFallback';

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));

export const adminRoutes = [
  <Route 
    key="admin-dashboard" 
    path="/administrator" 
    element={
      <ProtectedRoute allowedRoles={[UserRole.ADMINSTRATOR]}>
        <RestrictedLayout>
          <Suspense fallback={<LoadingFallback />}>
            <AdminDashboard />
          </Suspense>
        </RestrictedLayout>
      </ProtectedRoute>
    } 
  />
  /*<Route 
    key="admin-settings" 
    path="/administrador/configuracoes" 
    element={<RestrictedLayout><AdminSettings /></RestrictedLayout>} 
  />,*/
];