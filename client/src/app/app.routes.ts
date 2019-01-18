import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards';
import { HomeComponent } from './components/home/home.component';
import { ConductoresComponent } from './components/conductores/conductores.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { CalidadComponent } from './components/calidad/calidad.component';
import { LoginComponent } from './components/login/login.component';
import { ContratosComponent } from './components/contratos/contratos.component';
const app_routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'conductores', component: ConductoresComponent, canActivate: [AuthGuard] },
    { path: 'vehiculos', component: VehiculosComponent, canActivate: [AuthGuard] },
    { path: 'contratos', component: ContratosComponent, canActivate: [AuthGuard] },
    { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
    { path: 'estadisticas', component: EstadisticasComponent, canActivate: [AuthGuard] },
    { path: 'calidad', component: CalidadComponent, canActivate: [AuthGuard] },
    { path: '**', pathMatch: 'full', redirectTo: 'login' } // redireccion a algo que no esta definida
];

export const app_routing = RouterModule.forRoot(app_routes);
