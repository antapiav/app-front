import { Route } from '@angular/router';

import { UsuarioComponent } from './usuario.component';

export const usuarioRoute: Route = {
    path: 'usuario', component: UsuarioComponent,
    data: {
        title: 'Módulo Usuarios',
        breadcumb: ['BBVA', 'Usuarios', 'Operaciones']
    }
};
