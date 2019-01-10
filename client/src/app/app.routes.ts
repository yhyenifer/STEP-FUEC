import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConductoresComponent } from './components/conductores/conductores.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { CalidadComponent } from './components/calidad/calidad.component';
const app_routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'conductores', component: ConductoresComponent },
    { path: 'vehiculos', component: VehiculosComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'estadisticas', component: EstadisticasComponent },
    { path: 'calidad', component: CalidadComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' } // redireccion a algo que no esta definida
];

export const app_routing = RouterModule.forRoot(app_routes);
