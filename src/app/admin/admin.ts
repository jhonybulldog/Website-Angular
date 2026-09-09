import { Component, inject, OnInit, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { LoginService, User } from "../login/login.service";
@Component({
  imports: [ReactiveFormsModule],
  selector: "app-admin",
  styleUrl: "./admin.css",
  templateUrl: "./admin.html",
})
export class Admin implements OnInit {
  private loginService = inject(LoginService);


  isLoading = signal(false)
  errorMassage = signal('')
  utenti = signal<User[]>([]);
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
          this.caricaUtenti();
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
          this.caricaUtenti();
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

      this.loginService
        .cambiaPassword(username!, password!, passwordn!)
        .subscribe({
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

  caricaUtenti() {
    this.isLoading.set(true)
    this.errorMassage.set('')
    this.loginService.getutenti().subscribe({
      next: (dati) => {
        console.log("Utenti ricevuti dal backend:", dati);
        this.utenti.set(dati);
        this.isLoading.set(false)
      },
      error: (err) => {
        console.error("Errore durante il recupero degli utenti:", err);
        this.errorMassage.set('errore di connessione al server backend')
        this.isLoading.set(false)
      },
    });
  }

  ngOnInit() {
    this.caricaUtenti();
  }
  elimina(username: string) {
    this.loginService.cancellaAccount(username).subscribe({
      next: () => {
        console.log("utente eliminato :" + username);
        this.caricaUtenti();
      },
      error: () => {
        console.log('errore eliminazione server ');
      }
    });
  }
}
