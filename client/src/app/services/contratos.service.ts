import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conductores } from '../models/conductores';
import { Observable } from 'rxjs';

interface respond {
    status: string;
    success: string;
}
interface contratos {
    status: string;
    success: string;
}

@Injectable({
    providedIn: 'root'
})

export class ContratosService {
    readonly URL_API = 'http://localhost:8000/api/contratos';
    constructor(private http: HttpClient) {

    }

    //listar los contratos
    getContratos(): Observable<contratos[]> {
        let token = localStorage
            .getItem('token');
        return this.http.get<contratos[]>(this.URL_API, {
            headers: new HttpHeaders().append('token', token)
        });
    };

    //crear contrato
    addContrato(Contrato: any) {
        let token = localStorage
            .getItem('token');
        return this.http.post<respond>(this.URL_API, Contrato, {
            headers: new HttpHeaders().append('token', token)
        });
    };
}  