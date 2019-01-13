import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuarios.service';
import { Usuarios } from '../../models/usuarios';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


declare var M: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  state_eliminar: String;
  id_eliminar: String;
  confirPass: any;
  displayedColumns: string[] = ['name', 'username', 'role', 'opciones'];
  dataSource = new MatTableDataSource; constructor(private usuarioService: UsuarioService,
    private router: Router
  ) {
    // se consulta por el rol del usuario autenticado
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let rol = user.role;
    // esta pagina solo se le permite al administrador ingresar
    if (rol != 'Administrador') {
      this.router.navigate(['/home']);
    }
    this.usuarioService.selectedUsuario.state = true;
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

    setTimeout(() => {
      M.AutoInit(); //inicia los componentes de materilize

    }, 100);
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.usuarioService.usuarios = res as Usuarios[];
        this.dataSource = new MatTableDataSource(this.usuarioService.usuarios);
        this.dataSource.paginator = this.paginator;
      });
  }


  // limpiar campos de pantalla
  resetForm(form?: NgForm) {
    this.confirPass = '';
    this.usuarioService.selectedUsuario = new Usuarios();
    this.usuarioService.selectedUsuario.state = true;

    if (form) {
      form.reset();

    }
  };


  // agregar vehiculo
  addUsuario(form?: NgForm) {

    let usu = {
      _id: form.value._id,
      name: form.value.name,
      username: form.value.username,
      password: form.value.password,
      role: form.value.role,
      state: true
    }


    if (form.value._id) { // si existe el id, actualizamos
      this.usuarioService.updateUsuario(usu)
        .subscribe(res => {
          if (res.success == 'true') {
            this.resetForm(form);
            this.getUsuarios();
          }
          M.toast({ html: res.status });

        });

    } else {
      // validaciones consirmacion de contraseña
      if (this.confirPass != form.value.password) {
        M.toast({ html: 'Las Contraseñas no coinciden' });
        return;
      }
      let usu = {
        name: form.value.name,
        username: form.value.username,
        password: form.value.password,
        role: form.value.role,
        state: true
      }
      this.usuarioService.addUsuario(usu)
        .subscribe(res => {
          if (res.success == 'true') {
            this.resetForm(form);
            this.getUsuarios();
          }
          M.toast({ html: res.status });

        })
    }

  };

  // edita un vehiculo, seleccionaro y cargarlo en el formulario
  editUsuario(usuario: Usuarios) {
    this.usuarioService.selectedUsuario = usuario;
  }
  // elimina usuario
  deleteUsuario(id: String, state: String) {
    console.log('eli')
    this.id_eliminar = id;
    this.state_eliminar = state;
  }

  eliminar() {
    this.usuarioService.deleteUsuario(this.id_eliminar, this.state_eliminar)
      .subscribe(res => {
        if (res.success == 'true') {
          this.getUsuarios();
        }
        M.toast({ html: res.status });

      });
  }

}
