import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehiculos } from '../models/vehiculos';
import { Observable } from 'rxjs';
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
    return this.http.get<Vehiculos[]>(this.URL_API);
  };
  //crear vehiculo
  addVehiculo(Vehiculo: any) {
    return this.http.post<respond>(this.URL_API, Vehiculo);
  };
  //actualizar vehiculo
  updateVehiculo(vehiculo: any) {

    return this.http.put<respond>(this.URL_API + `/${vehiculo._id}`, vehiculo);
  };

  // eliminar vehiculo
  deleteVehiculo(_id: String, state: String) {
    return this.http.put<respond>(this.URL_API + `/delete/${_id}`, state);
  }

  //funcion que carga las alertas
  cargarAlertas() {
    return this.http.get<alerta>(this.URL_API + `/alert`);
  }
}
