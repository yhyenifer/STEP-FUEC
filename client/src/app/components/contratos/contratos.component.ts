import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { log } from 'util';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { MatPaginator, MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { ClienteService } from '../../services/clientes.service';
import { VehiculosService } from '../../services/vehiculos.service';
import { Vehiculos } from '../../models/vehiculos';

export interface Food {
  value: string;
  viewValue: string;
}



declare var M: any;
@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  vehiculo: string;
  arrayVehiculos: any[] = [];
  posicionVehiculo: number;
  hayVehiculos: boolean = false;
  hayConductores: boolean = false;
  idVehiculo: any;
  vehiculosPermiso: any;
  nombreVehiculo: string;
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  posicion: any;
  idCliente: string = "";
  nombreCliente: string;
  estableCliente: any;
  active: boolean = true;
  verInfo: boolean = false;
  verAddV: boolean = false;
  verAddC: boolean = false;
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
  // variables contrato
  objetoContrato: string = '';
  tipoContrato: string = '';
  renovable: boolean = false;
  cantPasajeros: number = 0;
  cantVehiculos: number = 0;
  rutaRegreso: string;
  rutaIda: string;
  fechaInicio: string;
  fechaFin: string;
  fechaCreacion: string;
  valor: number = 0;
  fechaPago: any;
  // fin variables contrato
  //variables del permiso
  fechaInicioPermiso: string;
  fechaFinPermiso: string;
  vehiculosDispo: any[];
  vehiculos = new FormControl();
  conductores = new FormControl();
  //fin variables del permiso
  state_eliminar: String;
  id_eliminar: String;
  displayedColumns: string[] = ['name', 'CC', 'license', 'opciones'];
  dataSource = new MatTableDataSource;
  today: string;
  clientes = new FormControl();
  //options: string[] = ['One', 'Two', 'Three'];
  options: any[];
  filteredOptions: Observable<string[]>;
  filteredVehiculos: Observable<string[]>;
  filteredConductores: Observable<string[]>;

  //variables contrato

  _id: String;
  ccCliente: String;
  // fin variables contrato
  @ViewChild('dataTable') table: ElementRef;

  constructor(private clienteService: ClienteService,
    private vehiculosService: VehiculosService) {
    this.today = moment().add('days', 1).format('YYYY-MM-DD');
    this.fechaCreacion = moment(this.today).format('YYYY-MM-DD');
    this.fechaInicioPermiso = this.fechaInicio;
    this.vehiculosPermiso = [];

    //this.url = 'http://localhost:8000/api/conductores';

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    // si el campo cliente presenta un cambio, este aplica e filtrp
    this.filteredOptions = this.clientes.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, { format: 'dd-mm-yyyy', autoClose: true });

    setTimeout(() => {
      M.AutoInit(); //inicia los componentes de materilize
      this.renovable = false;
    }, 200);


    this.cargarClientes();

  }

  cargarVehiculosConductores() {
    this.getVehiculos();
    // this.vehiculos = ;
    // si el campo vehiculo presenta un cambio, este aplica e filtrp
    this.filteredVehiculos = this.vehiculos.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterVihiculo(value))
      );

    // si el campo vehiculo presenta un cambio, este aplica e filtrp
    this.filteredConductores = this.conductores.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filterVihiculo(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.vehiculosDispo.filter(option => option.plate.toLowerCase().includes(filterValue)
      || option.lateral.toLowerCase().includes(filterValue));
  }

  cargarClientes() {
    this.options = [];
    this.clienteService.getClientes()
      .subscribe((res) => {
        this.options = res;
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue)
      || option.numero_identificacion.toLowerCase().includes(filterValue) || option.apellido.toLowerCase().includes(filterValue)
    );
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
          if (res.success == 'true') {
            this.resetFormClientes();
            this.cargarClientes();
          }
          M.toast({ html: res.status });
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
    this.telCliente = '';
    this.active = true;
    this.estableCliente = '';
    this.digitoCliente = '';
    this.repreCliente = '';
  }
  // identifica que el cliente se cambia y habilita o desabilita el boton de info
  cambiaCliente() {

    if (this.nombreCliente == '') {
      this.verInfo = false
    }
  }
  // identifica que el vehhiculo se cambia y habilita o desabilita el boton de agregar
  cambiaVehiculo() {
    if (this.nombreVehiculo == '') {
      this.verAddV = false
    }
  }
  // permite obtener el id del vehiculo una vez se selecciona y la posicion de arreglo de vehiculos
  setIDVehiculos(id, posicion) {
    if (id != undefined) {
      this.verAddV = true;
    }
    this.idVehiculo = id;
    // se busca el id para obtener la poscion del rreglo
    this.vehiculosDispo.map((op, key) => {

      if (op._id == this.idVehiculo) {
        this.posicionVehiculo = key;
      }
    });

  }
  agregarVehiculo() {
    this.vehiculosPermiso.push(this.idVehiculo);
    this.idVehiculo = "";
    this.vehiculo = "";
    this.arrayVehiculos.push(this.vehiculosDispo[this.posicionVehiculo]);

  }
  // permite obtener el id del cliente una vez se selecciona y la posicion de arreglo de clientes
  setIDCliente(id, posicion) {
    if (id != undefined) {
      this.verInfo = true
    }
    this.idCliente = id;
    // se busca el id para obtener la poscion del rreglo
    this.options.map((op, key) => {

      if (op._id == this.idCliente) {
        this.posicion = key;
      }
    });


  }

  seleccionarCliente() {
    this.tipoIdentCC = true;
    this.nombresCliente = this.options[this.posicion].nombre;
    this.apellidoCliente = this.options[this.posicion].apellido;
    this.tipoIdent = this.options[this.posicion].tipo_identif;
    this.expedicionCliente = this.options[this.posicion].lugar_exp_ced;
    this.numeroCliente = this.options[this.posicion].numero_identificacion;
    this.direccionCliente = this.options[this.posicion].direccion;
    this.ciudadCliente = this.options[this.posicion].ciudad;
    this.correoCliente = this.options[this.posicion].correo_elect;
    this.telCliente = this.options[this.posicion].telefono;
    this.active = this.options[this.posicion].state;
    if (this.options[this.posicion].tipo_identif != 'CC') {
      this.estableCliente = this.options[this.posicion].nombre_estable;
      this.digitoCliente = this.options[this.posicion].digito_verif;
      this.repreCliente = this.options[this.posicion].nombre_rep_legal;
      this.tipoIdentCC = false;

    }

  }
  // identifica que se selecciona fecha inicio y fin del contrato y los set en permisos
  selectFechaInicioContrato() {

    this.fechaInicioPermiso = this.fechaInicio;
    this.fechaFinPermiso = this.fechaFin;

  }
  getVehiculos() {
    this.vehiculosDispo = [];

    this.vehiculosService.getVehiculosDisponibles()
      .subscribe(res => {
        this.vehiculosDispo = res;
        if (this.vehiculosDispo.length > 0) {
          this.hayVehiculos = true;
        } else {
          this.hayVehiculos = false;
        }
      });
  }

  removeVehiculo(posicion) {
    console.log(posicion);
    console.log(this.vehiculosPermiso);
    this.vehiculosPermiso.splice(posicion, 1);
    this.arrayVehiculos.splice(posicion, 1);

  }


}
