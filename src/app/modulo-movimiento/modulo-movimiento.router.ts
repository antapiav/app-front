import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { movimientoRoute } from './movimiento/movimiento.route';

const MODULO_MOVIMIENTO_ROUTES = [
    movimientoRoute
];

export const moduloMovimientoRoutes: Routes = MODULO_MOVIMIENTO_ROUTES;

export const BbvaModuloMovimientoRoutes: ModuleWithProviders = RouterModule.forChild(moduloMovimientoRoutes);