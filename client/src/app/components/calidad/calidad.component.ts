import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calidad',
  templateUrl: './calidad.component.html',
  styleUrls: ['./calidad.component.css']
})
export class CalidadComponent implements OnInit {

  constructor(private router: Router) {
    // se consulta por el rol del usuario autenticado
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let rol = user.role;
    // esta pagina solo se le permite al administrador ingresar
    if (rol != 'Administrador') {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

}
