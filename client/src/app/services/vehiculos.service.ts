import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehiculos } from '../models/vehiculos';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
interface respond {
  status: string;
  success: string;
}

interface alerta {
  identificacion: string;
  nombre: string;
  alerta: string;
  fecha: string;
  fecha_diferencia: string;
  tipo_alerta: 1
}

interface vehiculoDispo {
  _id: string;
  plate: string;
  lateral: string;
}


@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  selectedVehiculo: Vehiculos;
  vehiculos: Vehiculos[];
  readonly URL_API = 'http://localhost:8000/api/vehiculos';
  constructor(private http: HttpClient) {
    this.selectedVehiculo = new Vehiculos();
  }

  //listar los vehiculos
  getVehiculos(): Observable<Vehiculos[]> {
    let token = localStorage
      .getItem('token');
    return this.http.get<Vehiculos[]>(this.URL_API, {
      headers: new HttpHeaders().append('token', token)
    });
  };
  //crear vehiculo
  addVehiculo(Vehiculo: any) {
    let token = localStorage
      .getItem('token');
    return this.http.post<respond>(this.URL_API, Vehiculo, {
      headers: new HttpHeaders().append('token', token)
    });
  };
  //actualizar vehiculo
  updateVehiculo(vehiculo: any) {
    let token = localStorage
      .getItem('token');
    return this.http.put<respond>(this.URL_API + `/${vehiculo._id}`, vehiculo, {
      headers: new HttpHeaders().append('token', token)
    });
  };

  // eliminar vehiculo
  deleteVehiculo(_id: String, state: String) {
    let token = localStorage
      .getItem('token');
    return this.http.put<respond>(this.URL_API + `/delete/${_id}`, state, {
      headers: new HttpHeaders().append('token', token)
    });
  }

  //funcion que carga las alertas
  cargarAlertas() {
    let token = localStorage
      .getItem('token');
    return this.http.get<alerta>(this.URL_API + `/alert`, {
      headers: new HttpHeaders().append('token', token)
    });
  }

  //listar los vehiculos disponibles
  getVehiculosDisponibles(fecha_fin): Observable<vehiculoDispo[]> {
    console.log('dis');
    let token = localStorage
      .getItem('token');
    return this.http.post<vehiculoDispo[]>(this.URL_API + `/disponible`,{fecha_fin: fecha_fin} ,{
      headers: new HttpHeaders().append('token', token)
    });
  };
}
