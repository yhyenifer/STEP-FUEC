import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConductoresComponent } from './components/conductores/conductores.component';
import {VehiculosComponent } from './components/vehiculos/vehiculos.component';
const app_routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'conductores', component: ConductoresComponent },
    { path: 'vehiculos', component: VehiculosComponent },

    { path: '**', pathMatch: 'full', redirectTo: 'home' } // redireccion a algo que no esta definida
];

export const app_routing = RouterModule.forRoot(app_routes);
