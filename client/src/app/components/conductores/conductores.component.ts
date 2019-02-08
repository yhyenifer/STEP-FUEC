import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConductoresService } from '../../services/conductores.service';
import { NgForm } from '@angular/forms';
import { Conductores } from '../../models/conductores';
import { log } from 'util';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


//import * as moment from 'moment'; // add this 1 of 4


declare var $;
declare var M: any;


@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css'],
  providers: [ConductoresService]
})

export class ConductoresComponent implements OnInit {

  state_eliminar: String;
  id_eliminar: String;
  displayedColumns: string[] = ['name', 'CC', 'license', 'opciones'];
  dataSource = new MatTableDataSource;
  today: string;




  @ViewChild('dataTable') table: ElementRef;

  constructor(private conductoresService: ConductoresService) {
    this.conductoresService.selectedConductor.internal = true;
    this.conductoresService.selectedConductor.active = true;
    this.today = moment().add('days', 1).format('YYYY-MM-DD');


  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    M.AutoInit(); //inicia los componentes de materilize
    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, { format: 'mm-dd-yyyy', autoClose: true });
    this.getConductores();
    //this.conductoresService.selectedConductor.licenseExpiration = new Date(moment(this.conductoresService.selectedConductor.licenseExpiration).format('dd-mm-yyyy'));
  }
  // agregar conductor
  addConductor(form?: NgForm) {
    if (isNaN(form.value.CC)) {
      M.toast({ html: 'En el campo cedula sólo se aceptan números' });
      return;
    }
    if (form.value._id) { // si existe el id, actualizamos
      this.conductoresService.updateConductor(form.value)
        .subscribe(res => {
          if (res.success == 'true') {
            this.resetForm(form);
            this.getConductores();
          }
          M.toast({ html: res.status });

        });

    } else {
      this.conductoresService.addConductor(form.value)
        .subscribe(res => {
          if (res.success == 'true') {
            this.resetForm(form);
            this.getConductores();
          }
          M.toast({ html: res.status });

        })
    }

  };
  // funcion que permite igualar CC con licencia
  onBlur() {
    this.conductoresService.selectedConductor.license = this.conductoresService.selectedConductor.CC;
  }
  onKeyUp() {
    this.conductoresService.selectedConductor.CC = this.conductoresService.selectedConductor.CC.replace(" ", "");
    this.conductoresService.selectedConductor.CC = this.conductoresService.selectedConductor.CC.replace(".", "");
  }
  // limpiar campos de pantalla
  resetForm(form?: NgForm) {
    this.conductoresService.selectedConductor = new Conductores();
    this.conductoresService.selectedConductor.internal = true;
    this.conductoresService.selectedConductor.active = true;
    if (form) {
      form.reset();
    }
  };

  //trae la lista de conductores
  getConductores() {
    this.conductoresService.getConductores()
      .subscribe(res => {
        this.conductoresService.conductores = res as Conductores[];
        this.dataSource = new MatTableDataSource(this.conductoresService.conductores);
        this.dataSource.paginator = this.paginator;
      });
  }
  // edita un conductor, seleccionaro y cargarlo en el formulario
  editConductor(conductor: Conductores) {
    console.log(conductor);

    this.conductoresService.selectedConductor = conductor;
  }

  // elimina conductor
  deleteConductor(id: String, state: String) {

    this.id_eliminar = id;
    this.state_eliminar = state;
  }

  eliminar() {
    console.log(this.id_eliminar);
    this.conductoresService.selectedConductor = undefined;
    this.conductoresService.deleteConductor(this.id_eliminar, this.state_eliminar)
      .subscribe(res => {
        if (res.success == 'true') {
          this.getConductores();
        }
        M.toast({ html: res.status });

      });
  }

}
