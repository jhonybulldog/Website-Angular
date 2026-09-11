import { Component, inject, OnInit, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { LoginService, User } from "./login/login.service";
import { delay } from "rxjs";
import { Prodotti , ListaProdotti} from "../shop/prodotti.service";
import { RouterLink } from "@angular/router";

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: "app-admin",
  styleUrl: "./admin.css",
  templateUrl: "./admin.html",
})
export class Admin implements OnInit {
  private loginService = inject(LoginService);
  private prodottiService = inject(Prodotti);

  isLoading = signal(false);
  errorMassage = signal("");
  utenti = signal<User[]>([]);
  crea = "";
  canc = "";
  change = "";
  prodotti = this.prodottiService.prod;
  prodottoDaModificare: ListaProdotti | null = null;
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

  productform = new FormGroup({
    nome: new FormControl("", [Validators.required]),
    desc: new FormControl("", [Validators.required]),
    prezzo: new FormControl(0, [Validators.required]),
    immagine: new FormControl("", [Validators.required]),
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

  cambia() {
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
    this.isLoading.set(true);
    this.errorMassage.set("");
    this.loginService
      .getutenti()
      .pipe(delay(500))
      .subscribe({
        next: (dati) => {
          console.log("Utenti ricevuti dal backend:", dati);
          this.utenti.set(dati);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error("Errore durante il recupero degli utenti:", err);
          this.errorMassage.set("errore di connessione al server backend");
          this.isLoading.set(false);
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
        console.log("errore eliminazione server ");
      },
    });
  }

  aggiungiProdotto() {
    if (this.productform.valid) {
      console.log(this.productform.value);
      const nuovoProdotto: ListaProdotti = {
        id: 0,
        nome: this.productform.value.nome!,
        desc: this.productform.value.desc!,
        prezzo: this.productform.value.prezzo!,
        immagine: this.productform.value.immagine!,
      };
      this.prodottiService.aggiungiProdotto(nuovoProdotto);
      console.log(this.prodottiService.prod());
      this.productform.reset()
    }
  }

  eliminaprodott(id: number){
    this.prodottiService.eliminaProdotto(id)
  }

  modificaProdotti(prodotto: ListaProdotti){
    this.prodottoDaModificare = prodotto;

    this.productform.patchValue({
      nome: prodotto.nome,
      desc: prodotto.desc,
      prezzo: prodotto.prezzo,
      immagine: prodotto.immagine,
    })
  }

  salvaModifica() {
  if (this.productform.valid && this.prodottoDaModificare !== null) {

    const prodottoModificato: ListaProdotti = {
      id: this.prodottoDaModificare.id,
      nome: this.productform.value.nome!,
      desc: this.productform.value.desc!,
      prezzo: this.productform.value.prezzo!,
      immagine: this.productform.value.immagine!
    };

    this.prodottiService.modificaProdotto(prodottoModificato);

    this.prodottoDaModificare = null;
    this.productform.reset();
  }
}
}
