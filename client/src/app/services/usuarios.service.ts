import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../models/usuarios';
import { Observable } from 'rxjs';
interface respond {
    status: string;
    success: string;
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
        return this.http.get<Usuarios[]>(this.URL_API);
    };
    //crear usuario
    addUsuario(usuario: any) {
        return this.http.post<respond>(this.URL_API, usuario);
    };
    //actualizar usuario
    updateUsuario(usuario: any) {

        return this.http.put<respond>(this.URL_API + `/${usuario._id}`, usuario);
    };

    // eliminar usuario
    deleteUsuario(_id: String, state: String) {
        return this.http.put<respond>(this.URL_API + `/delete/${_id}`, state);
    }
}
