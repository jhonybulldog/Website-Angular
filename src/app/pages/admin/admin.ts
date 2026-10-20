import { Component, inject, OnInit, signal, computed } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { LoginService, User } from "../../core/login/service/login.service";
import { delay, finalize } from "rxjs";
import { ProdottiService } from "../shop/service/prodotti.service";
import { Category, ProductDetails } from "../shop/models/prodotti.model";
import { Router, RouterLink } from "@angular/router";
import { PaginatedGrid } from "../../shared/paginated-grid/paginated-grid";

@Component({
  imports: [ReactiveFormsModule, RouterLink, PaginatedGrid],
  selector: "app-admin",
  styleUrl: "./admin.css",
  templateUrl: "./admin.html",
})
export class Admin implements OnInit {
  private loginService = inject(LoginService);
  private prodottiser = inject(ProdottiService);
  totaleUtenti = signal(0);
  paginaUtenti = { limit: 21, skip: 0, search: "" };
  totaleProdotti = signal(0);
  isLoading = signal(false);
  utenti = signal<User[]>([]);
  crea = "";
  canc = "";
  change = "";
  categoriaSelezionata = signal<string>("");

  prodotti = signal<ProductDetails[]>([]);
  prodottoDaModificare: ProductDetails | null = null;
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
    title: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    thumbnail: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    rating: new FormControl(0, [Validators.required]),
  });

  categoryform = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });

  categorymanageform = new FormGroup({
    categoria: new FormControl("", [Validators.required]),
    nomeNuovo: new FormControl("", [Validators.required]),
  });

  onSubmit() {
    if (this.creaform.valid) {
      const username = this.creaform.value.username;
      const password = this.creaform.value.password;

      this.loginService.creaAccount(username!, password!).subscribe(() => {
        this.creaform.reset();
        this.crea = "account creato con successo";
        this.caricaUtenti();
      });
    }
  }

  OnDelete() {
    if (this.delform.valid) {
      const username = this.delform.value.username;

      this.loginService.cancellaAccount(username!).subscribe(() => {
        this.canc = "account cancellato con successo";
        this.delform.reset();
        this.caricaUtenti();
      });
    }
  }

  cambia() {
    if (this.changeform.valid) {
      const username = this.changeform.value.username;
      const password = this.changeform.value.password;
      const passwordn = this.changeform.value.passwordn;

      this.loginService
        .cambiaPassword(username!, password!, passwordn!)
        .subscribe(() => {
          this.change = "password cambiata";
        });
    }
  }

  caricaUtenti(e = this.paginaUtenti) {
    this.paginaUtenti = e;
    this.isLoading.set(true);
    this.loginService
      .getutenti()
      .pipe(
        delay(500),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe((dati) => {
        const filtrati = dati.filter((u) => u.username.includes(e.search));
        this.totaleUtenti.set(filtrati.length);
        this.utenti.set(filtrati.slice(e.skip, e.skip + e.limit));
      });
  }

  categorie = signal<Category[]>([]);

  selezionacategoria(categoria: string) {
    this.categoriaSelezionata.set(categoria);
    console.log(categoria);
  }

  ngOnInit() {
    if (this.categorie().length === 0) {
      this.prodottiser.caricaCategorie().subscribe((risposta) => {
        this.categorie.set(risposta);
      });
    }
  }

  elimina(username: string) {
    this.loginService
      .cancellaAccount(username)
      .subscribe(() => this.caricaUtenti());
  }

  aggiungiProdotto() {
    if (this.productform.valid) {
      console.log(this.productform.value);
      const nuovoProdotto: ProductDetails = {
        id: 0,
        title: this.productform.value.title!,
        description: this.productform.value.description!,
        price: this.productform.value.price!,
        thumbnail: this.productform.value.thumbnail!,
        category: this.productform.value.category!,
        rating: this.productform.value.rating!,
      };
      this.prodottiser.aggiungiProdotto(nuovoProdotto).subscribe((create) => {
        this.prodotti.update((list) => [...list, create]);
      });
      console.log(this.prodotti());
      this.productform.reset();
    }
  }

  eliminaprodott(id: number) {
    this.prodottiser.eliminaProdotto(id).subscribe(() => {
      this.prodotti.update((list) =>
        list.filter((prodotto) => prodotto.id !== id),
      );
    });
  }

  modificaProdotti(prodotto: ProductDetails) {
    this.prodottoDaModificare = prodotto;

    this.productform.patchValue({
      title: prodotto.title,
      description: prodotto.description,
      price: prodotto.price,
      thumbnail: prodotto.thumbnail,
      category: prodotto.category,
    });
  }

  salvaModifica() {
    if (this.productform.valid && this.prodottoDaModificare !== null) {
      const id = this.prodottoDaModificare.id;
      const prodottoModificato = {
        title: this.productform.value.title!,
        description: this.productform.value.description!,
        price: this.productform.value.price!,
        thumbnail: this.productform.value.thumbnail!,
        category: this.productform.value.category!,
        rating: this.productform.value.rating!,
      };

      this.prodottiser
        .aggiornaProdotto(id, prodottoModificato)
        .subscribe((aggiornato) => {
          this.prodotti.update((list) =>
            list.map((prodotto) =>
              prodotto.id === id ? aggiornato : prodotto,
            ),
          );
          this.prodottoDaModificare = null;
          this.productform.reset();
        });
    }
  }
  aggiungicategory() {
    if (this.categoryform.valid) {
      const categorianuova = this.categoryform.value.name!;
      this.prodottiser.aggiungicategoria(categorianuova);
      this.categoryform.reset();
    }
  }
  modificacategory() {
    if (this.categorymanageform.valid) {
      const categoria = this.categorymanageform.value.categoria!;
      const nomeNuovo = this.categorymanageform.value.nomeNuovo!;

      this.prodottiser.modificacategoria(categoria, nomeNuovo);

      this.categorymanageform.reset();
    }
  }
  eliminacategory() {
    if (this.categorymanageform.valid) {
      const categoria = this.categorymanageform.value.categoria!;

      this.prodottiser.eliminacategoria(categoria);

      this.categorymanageform.reset();
    }
  }
  load(e: { limit: number; skip: number; search: string }) {
    this.prodottiser
      .caricaProdotti(e.limit, e.skip, "", e.search)
      .subscribe((risposta) => {
        this.prodotti.set(risposta.products);
        this.totaleProdotti.set(risposta.total);
      });
  }
}
