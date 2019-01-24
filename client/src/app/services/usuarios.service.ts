import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../models/usuarios';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
interface respond {
    status: string;
    success: string;
}
interface login {
    success: string;
    message: string;
    token: string;
    usuario: {};
}
@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    selectedUsuario: Usuarios;
    usuarios: Usuarios[];
    readonly URL_API = 'http://localhost:8000/api/usuarios';
    constructor(private http: HttpClient) {
        this.selectedUsuario = new Usuarios();
    }

    //listar los usuarios
    getUsuarios(): Observable<Usuarios[]> {
        let token = localStorage
            .getItem('token');
        return this.http.get<Usuarios[]>(this.URL_API, {
            headers: new HttpHeaders().append('token', token)
        });
    };
    //crear usuario
    addUsuario(usuario: any) {
        // let token = localStorage
        //    .getItem('token'); 
        return this.http.post<respond>(this.URL_API, usuario);
    };
    //actualizar usuario
    updateUsuario(usuario: any) {
        let token = localStorage
            .getItem('token');
        return this.http.put<respond>(this.URL_API + `/${usuario._id}`, usuario, {
            headers: new HttpHeaders().append('token', token)
        });
    };

    // eliminar usuario
    deleteUsuario(_id: String, state: String) {
        let token = localStorage
            .getItem('token');
        return this.http.put<respond>(this.URL_API + `/delete/${_id}`, state, {
            headers: new HttpHeaders().append('token', token)
        });
    }

    login(data) {
        return this.http.post<login>(this.URL_API + `/login`, data);

    }
}
