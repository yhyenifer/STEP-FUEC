import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConductoresService } from '../../services/conductores.service';
import { NgForm } from '@angular/forms';
import { Conductores } from '../../models/conductores';
import { log } from 'util';
import { Observable } from 'rxjs';
import * as moment from 'moment';

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
  displayedColumns: string[] = ['Nombre', 'Identificación', 'Num. Licencia', 'Opciones'];
  today: string;
  dataSource = this.conductoresService.conductores;



  @ViewChild('dataTable') table: ElementRef;

  constructor(private conductoresService: ConductoresService) {
    this.today = moment().add('days', 1).format('YYYY-MM-DD');

  }

  ngOnInit() {
    M.AutoInit(); //inicia los componentes de materilize
    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, { format: 'dd-mm-yyyy', autoClose: true });
    this.getConductores();
    //this.conductoresService.selectedConductor.licenseExpiration = new Date(moment(this.conductoresService.selectedConductor.licenseExpiration).format('dd-mm-yyyy'));
  }
  // agregar conductor
  addConductor(form?: NgForm) {
    console.log(form.value);
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
  // limpiar campos de pantalla
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.conductoresService.selectedConductor = new Conductores();
    }
  };

  //trae la lista de conductores
  getConductores() {
    this.conductoresService.getConductores()
      .subscribe(res => {
        this.conductoresService.conductores = res as Conductores[];
      });
  }
  // edita un conductor, seleccionaro y cargarlo en el formulario
  editConductor(conductor: Conductores) {
    console.log(conductor);

    this.conductoresService.selectedConductor = conductor;
  }
  // elimina conductor
  deleteConductor(id: String, state: String) {
    this.conductoresService.deleteConductor(id, state)
      .subscribe(res => {
        if (res.success == 'true') {
          this.getConductores();
        }
        M.toast({ html: res.status });

      });
  }
}
