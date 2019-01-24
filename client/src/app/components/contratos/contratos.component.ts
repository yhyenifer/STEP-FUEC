import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { log } from 'util';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { ClienteService } from '../../services/clientes.service';





declare var M: any;
@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  estableCliente: any;
  active: boolean = true;

  correoCliente: any;
  telCliente: any;
  ciudadCliente: any;
  // variables cliente
  direccionCliente: any;
  repreCliente: any;
  numeroCliente: any;
  tipoIdentCC: boolean;
  digitoCliente: any = '';
  expedicionCliente: any = '';
  tipoIdent: any = '';
  apellidoCliente: any = '';
  nombresCliente: any = '';

  state_eliminar: String;
  id_eliminar: String;
  displayedColumns: string[] = ['name', 'CC', 'license', 'opciones'];
  dataSource = new MatTableDataSource;
  today: string;
  clientes = new FormControl();
  //options: string[] = ['One', 'Two', 'Three'];
  options: any[];
  filteredOptions: Observable<string[]>;
  //variables contrato

  _id: String;
  ccCliente: String;
  // fin variables contrato
  @ViewChild('dataTable') table: ElementRef;

  constructor(private clienteService: ClienteService) {
    this.today = moment().add('days', 1).format('YYYY-MM-DD');
    //this.url = 'http://localhost:8000/api/conductores';

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.filteredOptions = this.clientes.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    setTimeout(() => {
      M.AutoInit(); //inicia los componentes de materilize

    }, 100);


    this.cargarClientes();

  }

  cargarClientes() {
    this.clienteService.getClientes()
      .subscribe((res) => {
        console.log(res);
        this.options = res;
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  cambiaTipo() {
    console.log('cambia');
    this.tipoIdentCC = false;
    if (this.tipoIdent == "CC") {
      this.tipoIdentCC = true;
    }
  }
  guardarCliente() {

    if (this.tipoIdent == "CC") {
      const cliente = {
        nombre: this.nombresCliente,
        apellido: this.apellidoCliente,
        tipo_identif: this.tipoIdent,
        lugar_exp_ced: this.expedicionCliente,
        numero_identificacion: this.numeroCliente,
        direccion: this.direccionCliente,
        ciudad: this.ciudadCliente,
        telefono: this.telCliente,
        correo_elect: this.correoCliente,
        state: this.active

      }
      this.clienteService.addCliente(cliente)
        .subscribe((res) => {
          console.log(res);
        });

    } else {
      const cliente = {
        nombre: this.nombresCliente,
        apellido: this.apellidoCliente,
        tipo_identif: this.tipoIdent,
        lugar_exp_ced: this.expedicionCliente,
        numero_identificacion: this.numeroCliente,
        nombre_estable: this.estableCliente,
        digito_verif: this.digitoCliente,
        nombre_rep_legal: this.repreCliente,
        direccion: this.direccionCliente,
        ciudad: this.ciudadCliente,
        telefono: this.telCliente,
        correo_elect: this.correoCliente,
        state: this.active

      }
      this.clienteService.addCliente(cliente)
        .subscribe((res) => {
          if (res.success == 'true') {
            this.resetFormClientes();
            this.cargarClientes();
          }
          M.toast({ html: res.status });
        });

    }

  }
  resetFormClientes() {
    this.nombresCliente = '';
    this.apellidoCliente = '';
    this.tipoIdent = 'CC';
    this.expedicionCliente = '';
    this.numeroCliente = '';
    this.direccionCliente = '';
    this.ciudadCliente = '';
    this.correoCliente = '';
    this.active = true;
    this.estableCliente  = '';
    this.digitoCliente = '';
    this.repreCliente = '';
  }

}
