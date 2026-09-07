import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from "./login.service";
@Component({
  imports: [ReactiveFormsModule],
  selector: "app-login",
  styleUrl: "./login.css",
  templateUrl: "./login.html",
})
export class Login {
  private loginService = inject(LoginService)



  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),    
  });

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.loginService.login(username!, password!).subscribe(
        (risposta) => {
          console.log('risposta avvenutta con successo')
        },
        (error) => {
          console.log('risposta errata');
        }
      );
    }
  }
}
