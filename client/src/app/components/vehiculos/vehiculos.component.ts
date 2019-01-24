import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import { NgForm } from '@angular/forms';
import { Vehiculos } from '../../models/vehiculos';
import { log } from 'util';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




declare var $;
declare var M: any;
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  datos: any[];
  displayedColumns: string[] = ['plate', 'model', 'year', 'lateral', 'class', 'passengers', 'GNV', 'opciones'];
  dataSource = new MatTableDataSource;
  today: string;
  state_eliminar: String;
  id_eliminar: String;
  formatYear = "YYYY";
  constructor(private vehiculosService: VehiculosService, public dialog: MatDialog) {
    this.vehiculosService.selectedVehiculo.internal = true;
    this.vehiculosService.selectedVehiculo.active = true;
    this.vehiculosService.selectedVehiculo.GNV = false;
    // fecha mas un dia
    this.today = moment().add('days', 1).format('YYYY-MM-DD');
    // fecha menos un dia
    // this.today = moment().subtract('days', 1).format('YYYY-MM-DD');
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        this.dataSource = new MatTableDataSource(this.vehiculosService.vehiculos);
        this.dataSource.paginator = this.paginator;


      });
  }

  // edita un vehiculo, seleccionaro y cargarlo en el formulario
  editVehiculo(vehiculo: Vehiculos) {
    this.vehiculosService.selectedVehiculo = vehiculo;
  }
  // elimina vehiculo
  deleteVehiculo(id: String, state: String) {

    this.id_eliminar = id;
    this.state_eliminar = state;
  }


  // limpiar campos de pantalla
  resetForm(form?: NgForm) {
    this.vehiculosService.selectedVehiculo = new Vehiculos();
    this.vehiculosService.selectedVehiculo.internal = true;
    this.vehiculosService.selectedVehiculo.active = true;
    this.vehiculosService.selectedVehiculo.GNV = false;
    if (form) {
      form.reset();

    }
  };


  // agregar vehiculo
  addVehiculo(form?: NgForm) {
    // validaciones numricas
    if (isNaN(form.value.year)) {
      M.toast({ html: 'Verifica el Año del Vehículo' });
      return;
    }
    if (isNaN(form.value.operation_card)) {
      M.toast({ html: 'Verifica la Tarjeta de Operación del Vehículo' });
      return;
    }
    if (isNaN(form.value.passengers)) {
      M.toast({ html: 'Verifica la Cantidad de Pasajeros del Vehículo' });
      return;
    }
    let vehi = {
      plate: form.value.plate,
      model: form.value.model,
      year: form.value.year,
      lateral: form.value.lateral,
      class: form.value.class,
      passengers: form.value.passengers,
      operation_card: form.value.operation_card,
      exp_to: form.value.exp_to,
      exp_soat: form.value.exp_soat,
      exp_tech: form.value.exp_tech,
      exp_prev: form.value.exp_prev,
      GNV: form.value.GNV,
      exp_gnv: '',
      exp_rcc: form.value.exp_rcc,
      active: form.value.active,
      internal: form.value.internal,
      state: true
    }
    if (vehi.GNV) {
      vehi.exp_gnv = form.value.exp_gnv;
    }
    if (form.value._id) { // si existe el id, actualizamos
      this.vehiculosService.updateVehiculo(vehi)
        .subscribe(res => {
          if (res.success == 'true') {
            this.resetForm(form);
            this.getVehiculos();
          }
          M.toast({ html: res.status });

        });

    } else {
      this.vehiculosService.addVehiculo(vehi)
        .subscribe(res => {
          if (res.success == 'true') {
            this.resetForm(form);
            this.getVehiculos();
          }
          M.toast({ html: res.status });

        })
    }

  };

  eliminar() {
    console.log('el');
    this.vehiculosService.deleteVehiculo(this.id_eliminar, this.state_eliminar)
      .subscribe(res => {
        if (res.success == 'true') {
          this.getVehiculos();
        }
        M.toast({ html: res.status });

      });
  }

}
