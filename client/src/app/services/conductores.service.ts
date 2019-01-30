import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conductores } from '../models/conductores';
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

interface conductoresDispo {
  _id: string;
  CC: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})

export class ConductoresService {


  selectedConductor: Conductores;
  conductores: Conductores[];
  readonly URL_API = 'http://localhost:8000/api/conductores';

  constructor(private http: HttpClient) {
    this.selectedConductor = new Conductores();
  }
  //listar los conductores
  getConductores(): Observable<Conductores[]> {
    let token = localStorage
      .getItem('token');
    return this.http.get<Conductores[]>(this.URL_API, {
      headers: new HttpHeaders().append('token', token)
    });
  };
  //crear conductor
  addConductor(Conductor: Conductores) {
    let token = localStorage
      .getItem('token');
    return this.http.post<respond>(this.URL_API, Conductor, {
      headers: new HttpHeaders().append('token', token)
    });
  };
  //actualizar conductor
  updateConductor(conductor: Conductores) {
    let token = localStorage
      .getItem('token');
    return this.http.put<respond>(this.URL_API + `/${conductor._id}`, conductor, {
      headers: new HttpHeaders().append('token', token)
    });
  };

  // eliminar conductor
  deleteConductor(_id: String, state: String) {
    let token = localStorage
      .getItem('token');
    return this.http.put<respond>(this.URL_API + `/delete/${_id}`, state, {
      headers: new HttpHeaders().append('token', token)
    }
    );
  }

  cargarAlertas() {
    let token = localStorage
      .getItem('token');
    return this.http.get<alerta>(this.URL_API + `/alert`, {
      headers: new HttpHeaders().append('token', token)
    });
  }

  //listar los conductores disponibles
  getConductoresDisponibles(fecha_fin): Observable<conductoresDispo[]> {

    let token = localStorage
      .getItem('token');
    return this.http.post<conductoresDispo[]>(this.URL_API + `/disponible`, { fecha_fin: fecha_fin }, {
      headers: new HttpHeaders().append('token', token)
    });
  };




}

