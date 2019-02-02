import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { log } from 'util';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import * as moment from 'moment';
import { MatPaginator, MatTableDataSource, MatDatepickerInputEvent, MatSelect } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { ClienteService } from '../../services/clientes.service';
import { PasajerosService } from '../../services/pasajeros.service';
import { VehiculosService } from '../../services/vehiculos.service';
import { Vehiculos } from '../../models/vehiculos';
import { ConductoresService } from '../../services/conductores.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { take } from 'rxjs/internal/operators/take';
//import { Subject } from 'rxjs/Subject';

export interface Food {
  value: string;
  viewValue: string;
}


interface Bank {
  _id: string;
  plate: string;
  lateral: string;

}


declare var M: any;
@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  _idPasajero: any;
  arrayPasajeros: any = [];
  pasajerosPermiso: any;
  posicionPasajero: number;
  idPasajero: any;
  verInfoP: boolean;
  pasajero = new FormControl();
  listaPasajeros: any[];
  adulto_responsable: string;
  telefonoPasajero: string;
  numero_identificacion: string;
  nombrePasajero: string;
  conductoresContrato: any = [];
  vehiculosContrato: any = [];
  arrayConductores: any[] = [];
  conductor: string;
  conductorPermiso: any;
  posicionConductor: any;
  idConductor: any;
  nombreConductor: string;
  nombPasajero: any = '';
  conductoresDispo: any[];
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
  descripcionObjeto: string = "";
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
  filteredPasajero: Observable<string[]>;


  //variables contrato

  _id: String;
  ccCliente: String;
  // fin variables contrato
  @ViewChild('dataTable') table: ElementRef;
  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks */
  private banks: Bank[] = [
    { plate: '', _id: '', lateral: "" }

  ]

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  /** list of banks filtered by search keyword for multi-selection */
  public filteredBanksMulti: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();
  constructor(private clienteService: ClienteService,
    private vehiculosService: VehiculosService, private conductoresService: ConductoresService,
    private pasajeroService: PasajerosService, ) {
    this.today = moment().add('days', 1).format('YYYY-MM-DD');
    this.fechaCreacion = moment(this.today).format('YYYY-MM-DD');
    this.fechaInicioPermiso = this.fechaInicio;
    this.vehiculosPermiso = [];
    this.conductorPermiso = [];
    this.pasajerosPermiso = [];

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

    this.filteredPasajero = this.pasajero.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterPasajero(value))
      );
    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, { format: 'dd-mm-yyyy', autoClose: true });

    setTimeout(() => {
      M.AutoInit(); //inicia los componentes de materilize
      this.renovable = false;
    }, 200);

    // set initial selection
    this.bankCtrl.setValue(this.banks[10]);

    // load the initial bank list
    this.filteredBanks.next(this.banks.slice());
    this.filteredBanksMulti.next(this.banks.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });


    this.cargarClientes();
    this.cargarPasajeros();

  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.plate.toLowerCase().indexOf(search) > -1 || bank.lateral.toLowerCase().indexOf(search) > -1)
    );
  }


  private setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function 
        // triggers initializing the selection according to the initial value of 
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially 
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Bank, b: Bank) => a._id === b._id;
      });
  }


  cargarVehiculosConductores() {
    if (this.fechaFinPermiso != undefined && this.fechaFinPermiso != '') {
      this.getVehiculos();
      this.getConductores();
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
    } else {
      M.toast({ html: 'Seleccione la Fecha Fin del Permiso' });

    }

  }
  private _filterVihiculo(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.vehiculosDispo.filter(option => option.plate.toLowerCase().includes(filterValue)
      || option.lateral.toLowerCase().includes(filterValue));
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.conductoresDispo.filter(option => option.CC.toLowerCase().includes(filterValue)
      || option.name.toLowerCase().includes(filterValue));
  }
  private _filterPasajero(value: string): string[] {
    const filterValue = value.toLowerCase();


    return this.listaPasajeros.filter(option => option.numero_identificacion.toLowerCase().includes(filterValue)
      || option.nombre.toLowerCase().includes(filterValue));
  }

  cargarClientes() {
    this.options = [];
    this.clienteService.getClientes()
      .subscribe((res) => {
        this.options = res;
      });
  }
  cargarPasajeros() {
    this.listaPasajeros = [];
    this.pasajeroService.getPasajero()
      .subscribe((res) => {
        this.listaPasajeros = res;
      });
  }



  cambiaTipo() {
    console.log('cambia');
    this.tipoIdentCC = false;
    if (this.tipoIdent == "CC") {
      this.tipoIdentCC = true;
    }
  }
  guardarCliente() {
    console.log('guadrar cie');
    console.log(this.tipoIdent);
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
  guardarPasajero() {
    const newPasajero = {
      nombre: this.nombPasajero,
      numero_identificacion: this.numero_identificacion,
      telefono: this.telefonoPasajero,
      adulto_responsable: this.adulto_responsable
    }

    // this._idPasajero

    console.log('guardar pasajero');
    console.log(newPasajero);
    this.pasajeroService.addPasajero(newPasajero)
      .subscribe((res) => {
        if (res.success == 'true') {
          this.resetFormPasajero();
          this.cargarPasajeros();
        }
      });
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

  resetFormPasajero() {
    this.nombPasajero = '';
    this.numero_identificacion = '';
    this.telefonoPasajero = '';
    this.adulto_responsable = '';
  }
  // identifica que el cliente se cambia y habilita o desabilita el boton de info
  cambiaCliente() {

    if (this.nombreCliente == '') {
      this.verInfo = false
    }
  }
  // identifica que el pasajero se cambia y habilita o desabilita el boton de info
  cambiaPasajero() {

    if (this.nombrePasajero == '') {
      this.verInfoP = false
    }
  }
  // identifica que el vehhiculo se cambia y habilita o desabilita el boton de agregar
  cambiaVehiculo() {
    if (this.nombreVehiculo == '') {
      this.verAddV = false
    }
  }
  // identifica que el conductor se cambia y habilita o desabilita el boton de agregar
  cambiaConductor() {
    if (this.nombreConductor == '') {
      this.verAddC = false
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
  // permite obtener el id del vehiculo una vez se selecciona y la posicion de arreglo de vehiculos
  setIDConductores(id, posicion) {
    if (id != undefined) {
      this.verAddC = true;
    }
    this.idConductor = id;
    // se busca el id para obtener la poscion del rreglo
    this.conductoresDispo.map((op, key) => {

      if (op._id == this.idConductor) {
        this.posicionConductor = key;
      }
    });

  }
  agregarConductor() {
    this.conductorPermiso.push(this.idConductor);
    this.idConductor = "";
    this.conductor = "";
    this.arrayConductores.push(this.conductoresDispo[this.posicionConductor]);

  }
  agregarVehiculo() {
    if (this.vehiculosPermiso.length == 0) {
      this.vehiculosPermiso.push(this.idVehiculo);
      this.idVehiculo = "";
      this.vehiculo = "";
      this.arrayVehiculos.push(this.vehiculosDispo[this.posicionVehiculo]);
      // set fecha fn del contrato de acuerdo a la fecha de vencimiento mas proxima a vencer
      if (this.arrayVehiculos[0].exp_to < this.fechaFinPermiso) { // pendiente cambiar
        this.fechaFinPermiso = this.arrayVehiculos[0].exp_to;
      }
    } else {
      M.toast({ html: 'Ya hay un vehículo seleccionado, para cambiarlo, debe eliminar el seleccionado' });

    }


  }
  agregarPasajero() {
    // arreglo de id agregados
    this.pasajerosPermiso.push(this.idPasajero);
    this.idPasajero = "";
    this.nombPasajero = "";
    // areglo para mostrar en vista
    this.arrayPasajeros.push(this.listaPasajeros[this.posicionPasajero]);

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

  // permite obtener el id del pasajero una vez se selecciona y la posicion de arreglo de pasajero
  setIDPasajero(id, posicion) {
    if (id != undefined) {
      this.verInfoP = true
    }
    this.idPasajero = id;
    // se busca el id para obtener la poscion del rreglo
    this.listaPasajeros.map((op, key) => {

      if (op._id == this.idPasajero) {
        this.posicionPasajero = key;
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

  seleccionarPasajero() {
    this._idPasajero = this.listaPasajeros[this.posicionPasajero]._id;
    this.numero_identificacion = this.listaPasajeros[this.posicionPasajero].numero_identificacion;
    this.nombPasajero = this.listaPasajeros[this.posicionPasajero].nombre;
    this.telefonoPasajero = this.listaPasajeros[this.posicionPasajero].telefono;
    this.adulto_responsable = this.listaPasajeros[this.posicionPasajero].adulto_responsable;
  }
  // identifica que se selecciona fecha inicio y fin del contrato y los set en permisos
  selectFechaInicioContrato() {

    this.fechaInicioPermiso = this.fechaInicio;
    this.fechaFinPermiso = this.fechaFin;

  }
  getVehiculos() {
    this.vehiculosDispo = [];

    this.vehiculosService.getVehiculosDisponibles(this.fechaFinPermiso)
      .subscribe(res => {
        this.vehiculosDispo = res;
        console.log('vehiculos dispo');
        console.log(this.vehiculosDispo);
        if (this.vehiculosDispo.length > 0) {
          this.vehiculosDispo.map((dato, key) => {
            this.banks[key]._id = dato._id;
            this.banks[key].plate = dato.plate;
            this.banks[key].lateral = dato.lateral;


          });
          this.hayVehiculos = true;
        } else {
          this.hayVehiculos = false;
        }
      });
  }
  getConductores() {
    this.conductoresDispo = [];

    this.conductoresService.getConductoresDisponibles(this.fechaFinPermiso)
      .subscribe(res => {
        this.conductoresDispo = res;
        console.log(this.conductoresDispo);
        if (this.conductoresDispo.length > 0) {
          this.hayConductores = true;
        } else {
          this.hayConductores = false;
        }
      });
  }

  removeVehiculo(posicion) {

    this.vehiculosPermiso.splice(posicion, 1);
    this.arrayVehiculos.splice(posicion, 1);

  }

  removeConductores(posicion) {

    this.conductorPermiso.splice(posicion, 1);
    this.arrayConductores.splice(posicion, 1);

  }

  removePasajeros(posicion) {

    this.pasajerosPermiso.splice(posicion, 1);
    this.arrayPasajeros.splice(posicion, 1);

  }

  agergarOtroPermiso() {
    var posicion = this.vehiculosContrato.length;
    var posicionC = this.vehiculosContrato.length;
    this.vehiculosContrato[posicion] = [];
    this.conductoresContrato[posicion] = [];

    for (let index = 0; index < this.arrayVehiculos.length; index++) {
      this.vehiculosContrato[posicion].push(this.arrayVehiculos[index]._id);
    }
    for (let index = 0; index < this.arrayConductores.length; index++) {
      this.conductoresContrato[posicionC].push(this.arrayConductores[index]._id);
    }
    console.log(this.vehiculosContrato);
    console.log(this.conductoresContrato);
    this.arrayVehiculos = [];
    this.arrayConductores = [];
    this.fechaFinPermiso = "";
    this.fechaInicioPermiso = "";

  }
  agergarPermiso() {
    console.log('no agregar otro permiso');
    var posicion = this.vehiculosContrato.length;
    var posicionC = this.vehiculosContrato.length;
    this.vehiculosContrato[posicion] = [];
    this.conductoresContrato[posicion] = [];

    for (let index = 0; index < this.arrayVehiculos.length; index++) {
      this.vehiculosContrato[posicion].push(this.arrayVehiculos[index]._id);
    }
    for (let index = 0; index < this.arrayConductores.length; index++) {
      this.conductoresContrato[posicionC].push(this.arrayConductores[index]._id);
    }
    console.log(this.vehiculosContrato);
    console.log(this.conductoresContrato);
  }


}
