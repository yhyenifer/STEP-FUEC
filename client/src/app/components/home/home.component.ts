import { Component, OnInit } from '@angular/core';
import { ConductoresService } from '../../services/conductores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alertasConductores: any;
  efecto2: string;
  efecto1: string;
  constructor(private conductoresService: ConductoresService) {
  }

  ngOnInit() {
    this.cargarAlertasConductores();
  }

  cargarAlertasConductores() {
    this.conductoresService.cargarAlertas()
      .subscribe((res => {
        this.alertasConductores = res;
      }));
  }


}
