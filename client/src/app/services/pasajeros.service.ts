import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface respond {
    status: string;
    success: string;
}
interface pasajeros {
    _id: string;
    numero_identificacion: string;
    nombre: string;
    telefono: string;
}
@Injectable({
    providedIn: 'root'
})

export class PasajerosService {


    readonly URL_API = 'http://localhost:8000/api/pasajeros';

    constructor(private http: HttpClient) {
    }
    //listar los conductores
    getPasajero(): Observable<pasajeros[]> {
        let token = localStorage
            .getItem('token');
        return this.http.get<pasajeros[]>(this.URL_API, {
            headers: new HttpHeaders().append('token', token)
        });
    };
    //crear conductor
    addPasajero(pasajero: any) {
        let token = localStorage
            .getItem('token');
        return this.http.post<respond>(this.URL_API, pasajero, {
            headers: new HttpHeaders().append('token', token)
        });
    };
    //actualizar pasajero
    updatePasajero(pasajero: any) {
        let token = localStorage
            .getItem('token');
        return this.http.put<respond>(this.URL_API + `/${pasajero._id}`, pasajero, {
            headers: new HttpHeaders().append('token', token)
        });
    };

    // eliminar pasajero
    deletePasajero(_id: String, state: String) {
        let token = localStorage
            .getItem('token');
        return this.http.put<respond>(this.URL_API + `/delete/${_id}`, state, {
            headers: new HttpHeaders().append('token', token)
        }
        );
    }






}
