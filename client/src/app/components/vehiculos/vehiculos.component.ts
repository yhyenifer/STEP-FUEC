import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import { NgForm } from '@angular/forms';
import { Vehiculos } from '../../models/vehiculos';
import { log } from 'util';
import { Observable } from 'rxjs';
import * as moment from 'moment';


declare var $;
declare var M: any;
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
  formatYear = "YYYY";
  constructor(private vehiculosService: VehiculosService) {

  }

  ngOnInit() {
    M.AutoInit(); //inicia los componentes de materilize
    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, { format: 'dd-mm-yyyy', autoClose: true });
    this.getVehiculos();
  }
  getVehiculos() {
    this.vehiculosService.getVehiculos()
      .subscribe(res => {
        this.vehiculosService.vehiculos = res as Vehiculos[];
      });
  }

  // edita un vehiculo, seleccionaro y cargarlo en el formulario
  editVehiculo(vehiculo: Vehiculos) {
    this.vehiculosService.selectedVehiculo = vehiculo;
  }
  // elimina vehiculo
  deleteVehiculo(id: String, state: String) {
    this.vehiculosService.deleteVehiculo(id, state)
      .subscribe(res => {
        if (res.success == 'true') {
          this.getVehiculos();
        }
        M.toast({ html: res.status });

      });
  }


  // limpiar campos de pantalla
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.vehiculosService.selectedVehiculo = new Vehiculos();
    }
  };


  // agregar vehiculo
  addVehiculo(form?: NgForm) {
    console.log(form.value);
    if (form.value._id) { // si existe el id, actualizamos
      this.vehiculosService.updateVehiculo(form.value)
        .subscribe(res => {
          if (res.success == 'true') {
            this.resetForm(form);
            this.getVehiculos();
          }
          M.toast({ html: res.status });

        });

    } else {
      this.vehiculosService.addVehiculo(form.value)
        .subscribe(res => {
          if (res.success == 'true') {
            this.resetForm(form);
            this.getVehiculos();
          }
          M.toast({ html: res.status });

        })
    }

  };

}
