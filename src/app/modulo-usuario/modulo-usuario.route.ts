import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { usuarioRoute } from './usuario/usuario.route';

const MODULO_USUARIO_ROUTES = [
    usuarioRoute
];

export const moduloUsuarioRoutes: Routes = MODULO_USUARIO_ROUTES;

export const BbvaModuloUsuarioRoutes: ModuleWithProviders = RouterModule.forChild(moduloUsuarioRoutes);