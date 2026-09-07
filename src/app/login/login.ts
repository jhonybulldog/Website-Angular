import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
@Component({
  imports: [ReactiveFormsModule],
  selector: "app-login",
  styleUrl: "./login.css",
  templateUrl: "./login.html",
})
export class Login {
  private loginService = inject(LoginService);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.loginService.login(username!, password!).subscribe(
        (risposta) => {
          console.log("Login effettuato con successo");

          this.loginService.setLoggedIn();
          this.router.navigate(["/admin"]);
        },
        (error) => {
          console.log("risposta errata");
        },
      );
    }
  }
}
