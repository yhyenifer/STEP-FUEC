import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password: any;
  username: any;
  constructor(private usuarioService: UsuarioService,
    private _router: Router) { }

  ngOnInit() {
  }


  login() {


    this.usuarioService.login({ username: this.username, password: this.password })
      .subscribe((res => {
        console.log(res);
        if (res.success) {
          localStorage.setItem('token', res.token.toString());
          localStorage.setItem('currentUser', JSON.stringify(res.usuario));

          this._router.navigate(['/home']);
        } else {
          M.toast({ html: res.message });
        }

      }));
  }
}
