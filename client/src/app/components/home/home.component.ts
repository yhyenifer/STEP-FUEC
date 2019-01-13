import { Component, OnInit } from '@angular/core';
import { ConductoresService } from '../../services/conductores.service';
import { VehiculosService } from '../../services/vehiculos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alertasConductores: any;
  efecto2: string;
  efecto1: string;
  alertasVehiculos: any;
  constructor(private conductoresService: ConductoresService, private vehiculoService: VehiculosService) {
  }

  ngOnInit() {
    this.cargarAlertasConductores();
    this.cargarAlertasVehiculos();
  }

  cargarAlertasConductores() {
    this.conductoresService.cargarAlertas()
      .subscribe((res => {
        this.alertasConductores = res;
      }));
  }

  cargarAlertasVehiculos() {
    this.vehiculoService.cargarAlertas()
      .subscribe((res => {
        this.alertasVehiculos = res;
      }));
  }

}
