import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConductoresComponent } from './components/conductores/conductores.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { CalidadComponent } from './components/calidad/calidad.component';
import { LoginComponent } from './components/login/login.component';
const app_routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'conductores', component: ConductoresComponent },
    { path: 'vehiculos', component: VehiculosComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'estadisticas', component: EstadisticasComponent },
    { path: 'calidad', component: CalidadComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'login' } // redireccion a algo que no esta definida
];

export const app_routing = RouterModule.forRoot(app_routes);
