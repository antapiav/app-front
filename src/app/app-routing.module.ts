import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { DashboardComponent } from './modulo-dashboard/dashboard/dashboard.component';

export const appRoutes: Routes = [
    { 
        path: '', component: DashboardComponent,
        children:[
            {
                path:'',
                component: MainComponent,
                data: {
                    title: 'BBVA',
                    breadcumb: ['BIENVENIDO']
                }
            },
            {
                path: 'modulo-movimientos',
                loadChildren: () => import('./modulo-movimiento/modulo-movimiento.module').then(m => m.ModuloMovimientoModule)
                
            },
            {
                path: 'modulo-usuario',
                loadChildren: () => import('./modulo-usuario/modulo-usuario.module').then(m => m.ModuloUsuarioModule)
            }
        ]
    },
    { 
        path: 'modulo-dashboard',
        loadChildren: () => import('./modulo-dashboard/modulo-dashboard.module').then(m => m.ModuloDashboardModule)
    },
    {
        path: 'modulo-login',
        loadChildren: () => import('./modulo-login/modulo-login.module').then(m => m.ModuloLoginModule)
    },
    {  path: '**', redirectTo: 'modulo-login/login' }
  ];

  export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true, onSameUrlNavigation: 'reload' });