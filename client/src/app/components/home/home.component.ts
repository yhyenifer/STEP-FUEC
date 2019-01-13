import { Component, OnInit } from '@angular/core';
import { ConductoresService } from '../../services/conductores.service';
import { VehiculosService } from '../../services/vehiculos.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ver: boolean = false;
  alertasConductores: any;
  efecto2: string;
  efecto1: string;
  alertasVehiculos: any;
  constructor(private conductoresService: ConductoresService, private vehiculoService: VehiculosService, app: AppComponent) {
    app.verOpcion = true;
  }

  ngOnInit() {
    this.cargarAlertasConductores();
    this.cargarAlertasVehiculos();
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let role = user.role;
    console.log(role);

    if (role == 'Administrador') {
      this.ver = true;
    }
  }

  cargarAlertasConductores() {
    this.conductoresService.cargarAlertas()
      .subscribe((res => {
        this.alertasConductores = res;
        // ordena las alertas por fecha
        this.alertasConductores.sort(function (a, b) {
          if (a.fecha > b.fecha) {
            return 1;
          }
          return 0;
        })
      }));




  }

  cargarAlertasVehiculos() {
    this.vehiculoService.cargarAlertas()
      .subscribe((res => {
        this.alertasVehiculos = res;
        // ordena las alertas por fecha
        this.alertasVehiculos.sort(function (a, b) {
          if (a.fecha > b.fecha) {
            return 1;
          }
          return 0;
        })
      }));
  }



}
