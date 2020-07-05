import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { loginRoute } from './login/login.route';

const MODULO_LOGIN_ROUTES = [
    loginRoute
];

export const moduloLoginRoutes: Routes = MODULO_LOGIN_ROUTES;

export const BbvaModuloLoginRoutes: ModuleWithProviders = RouterModule.forChild(moduloLoginRoutes);