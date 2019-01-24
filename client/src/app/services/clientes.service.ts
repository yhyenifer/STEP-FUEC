import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface respond {
    status: string;
    success: string;
}

interface Clientes {
    nombre: string;
    apellido: string;
    nombre_estable: string;
    numero_identificacion: string;
    lugar_exp_ced: string;
    tipo_cooperacion: string;
    digito_verif: string;
    nombre_rep_legal: string;
    direccion: string;
    ciudad: string;
    telefono: string;
    correo_elect: string;
    state: string;
}

@Injectable({
    providedIn: 'root'
})

export class ClienteService {


    readonly URL_API = 'http://localhost:8000/api/clientes';

    constructor(private http: HttpClient) {
    }
    //listar los clientes
    getClientes(): Observable<Clientes[]> {
        let token = localStorage
            .getItem('token');
        return this.http.get<Clientes[]>(this.URL_API, {
            headers: new HttpHeaders().append('token', token)
        });
    };
    //crear cliente
    addCliente(Cliente: any) {
        let token = localStorage
            .getItem('token');
        return this.http.post<respond>(this.URL_API, Cliente, {
            headers: new HttpHeaders().append('token', token)
        });
    };
    //actualizar conductor
    updateConductor(conductor: any) {
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






}

