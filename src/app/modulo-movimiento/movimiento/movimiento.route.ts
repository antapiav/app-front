import { Route } from '@angular/router';

import { MovimientoComponent } from './movimiento.component';

export const movimientoRoute: Route = {
    path: 'movimientos', component: MovimientoComponent,
    data: {
        title: 'Movimientos',
        breadcumb: ['BBVA', 'Movimientos', 'Operaciones']
    }
};
