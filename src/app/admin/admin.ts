import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { LoginService } from "../login/login.service";
@Component({
  imports: [ReactiveFormsModule],
  selector: "app-admin",
  styleUrl: "./admin.css",
  templateUrl: "./admin.html",
})
export class Admin {
  private loginService = inject(LoginService);

  crea = "";
  canc = "";
  change = "";
  creaform = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  delform = new FormGroup({
    username: new FormControl("", [Validators.required]),
  });

  changeform = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    passwordn: new FormControl("", [Validators.required]),
  });

  onSubmit() {
    if (this.creaform.valid) {
      console.log(this.creaform.value);
      const username = this.creaform.value.username;
      const password = this.creaform.value.password;

      this.loginService.creaAccount(username!, password!).subscribe(
        (risposta) => {
          console.log("account creato con successo");
          this.creaform.reset();
          this.crea = "account creato con successo";
        },
        (error) => {
          console.log("account non creato errore");
          this.crea = "account non riuscito a cancellare errore";
        },
      );
    }
  }

  OnDelete() {
    if (this.delform.valid) {
      const username = this.delform.value.username;

      this.loginService.cancellaAccount(username!).subscribe(
        (risposta) => {
          console.log("account cancellato con successo");
          this.canc = "account cancellato con successo";
          this.delform.reset();
        },
        (error) => {
          this.canc = "account non riuscito a cancellare errore";

          console.log("account non riuscito a cancellare errore");
        },
      );
    }
  }

  OnChange() {
    if (this.changeform.valid) {
      const username = this.changeform.value.username;
      const password = this.changeform.value.password;
      const passwordn = this.changeform.value.passwordn;

      this.loginService.cambiaPassword(username!, password!, passwordn!).subscribe({
          next: (risposta) => {
            this.change = "password cambiata";
            console.log("password cambiata con successo");
          },
          error: (error) => {
            this.change = "password non cambiata errore";
            console.log("password non cambiata errore");
          },
        });
    }
  }
}
