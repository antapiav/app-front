import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { dashboardRoute } from './dashboard/dashboard.route';

const MODULO_DASHBOARD_ROUTES = [
    dashboardRoute
];

export const moduloDashboardRoutes: Routes = MODULO_DASHBOARD_ROUTES;

export const BbvaModuloDashboardRoutes: ModuleWithProviders = RouterModule.forChild(moduloDashboardRoutes);