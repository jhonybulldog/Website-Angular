import { Component, inject, computed, signal } from "@angular/core";
import { CartService } from "../carrello/cart.service";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
interface Indirizzo {
  id: number;
  nome: string;
  nomeCognome: string;
  via: string;
  citta: string;
  cap: number;
  provincia: string;
}
@Component({
  imports: [ReactiveFormsModule],
  selector: "app-checkout",
  styleUrl: "./checkout.css",
  templateUrl: "./checkout.html",
})
export class Checkout {
  private carrelloser = inject(CartService);
  metodoPagamento = signal("");
  prodotti = this.carrelloser.carrello;
  spedizione = signal(5);
  cartaConfermata = signal(false);
  private nextId = 1;
  indirizzi = signal<Indirizzo[]>([]);
  indirizzoSelezionato = signal<number | null>(null);
  indirizzoDaModificare: Indirizzo | null = null;
  ultimoIndirizzoCreato = signal<Indirizzo | null>(null);
  indirizziIntestati = signal<{ via: string; intestatario: string }[]>([]);
  indirizziInAttesa = signal<{ indirizzo: Indirizzo; form: FormGroup }[]>([]);

  indirizzoIntestatoForm = new FormGroup({
    intestatario: new FormControl("", [Validators.required]),
  });

  metodoPagamentoForm = new FormGroup({
    metodo: new FormControl("", [Validators.required]),
  });

  cartaform = new FormGroup({
    dati: new FormControl("", [Validators.required]),
    cvv: new FormControl(0, [Validators.required]),
  });
  totale = computed(() =>
    this.prodotti().reduce((totale, prodotto) => {
      return totale + prodotto.prodotto.price * prodotto.quantita;
    }, 0),
  );

  totaleordine = computed(() => {
    return this.totale() + this.spedizione();
  });
  selezionaPagamento() {
    this.metodoPagamento.set(this.metodoPagamentoForm.value.metodo!);
  }

  confermacance() {
    if (this.cartaform.valid) {
      this.cartaConfermata.set(true);
      this.cartaform.reset();
    }
  }

  indirizzoForm = new FormGroup({
    nome: new FormControl("", [Validators.required]),
    nomeCognome: new FormControl("", [Validators.required]),
    via: new FormControl("", [Validators.required]),
    citta: new FormControl("", [Validators.required]),
    cap: new FormControl("", [Validators.required]),
    provincia: new FormControl("", [Validators.required]),
  });

  selezionaIndirizzo(id: number) {
    this.indirizzoSelezionato.set(id);
  }

  aggiungiIndirizzo() {
    if (this.indirizzoForm.valid) {
      const nuovoIndirizzo: Indirizzo = {
        id: this.nextId,
        nome: this.indirizzoForm.value.nome!,
        nomeCognome: this.indirizzoForm.value.nomeCognome!,
        via: this.indirizzoForm.value.via!,
        citta: this.indirizzoForm.value.citta!,
        cap: Number(this.indirizzoForm.value.cap!),
        provincia: this.indirizzoForm.value.provincia!,
      };

      // Aggiungo sia alla lista globale degli indirizzi che a quella in attesa di intestatario
      this.indirizzi.update((indirizzi) => [...indirizzi, nuovoIndirizzo]);
      this.indirizziInAttesa.update((lista) => [
        ...lista,
        {
          indirizzo: nuovoIndirizzo,
          form: new FormGroup({
            intestatario: new FormControl("", [Validators.required]),
          }),
        },
      ]);

      this.nextId++;
      this.indirizzoForm.reset();
    }
  }

  modificaIndirizzo(indirizzo: Indirizzo) {
    this.indirizzoDaModificare = indirizzo;

    this.indirizzoForm.patchValue({
      nome: indirizzo.nome,
      nomeCognome: indirizzo.nomeCognome,
      via: indirizzo.via,
      citta: indirizzo.citta,
      cap: String(indirizzo.cap),
      provincia: indirizzo.provincia,
    });
  }

  salvaModificaIndirizzo() {
    if (this.indirizzoForm.valid && this.indirizzoDaModificare !== null) {
      const indirizzoModificato: Indirizzo = {
        id: this.indirizzoDaModificare.id,
        nome: this.indirizzoForm.value.nome!,
        nomeCognome: this.indirizzoForm.value.nomeCognome!,
        via: this.indirizzoForm.value.via!,
        citta: this.indirizzoForm.value.citta!,
        cap: Number(this.indirizzoForm.value.cap!),
        provincia: this.indirizzoForm.value.provincia!,
      };

      this.indirizzi.update((indirizzi) =>
        indirizzi.map((indirizzo) =>
          indirizzo.id === indirizzoModificato.id
            ? indirizzoModificato
            : indirizzo,
        ),
      );

      this.indirizzoDaModificare = null;
      this.indirizzoForm.reset();
    }
  }

  eliminaIndirizzo(id: number) {
    this.indirizzi.update((indirizzi) =>
      indirizzi.filter((indirizzo) => indirizzo.id !== id),
    );
    this.indirizziInAttesa.update((lista) =>
      lista.filter((el) => el.indirizzo.id !== id),
    );

    if (this.indirizzoSelezionato() === id) {
      this.indirizzoSelezionato.set(null);
    }

    this.indirizzoForm.reset();
  }

  confermaIntestatario(item: { indirizzo: Indirizzo; form: FormGroup }) {
    if (item.form.valid) {
      const nuovaNotifica = {
        via: item.indirizzo.via,
        intestatario: item.form.value.intestatario!,
      };

      this.indirizziIntestati.update((lista) => [...lista, nuovaNotifica]);

      // Rimuovo questo indirizzo dalla lista "in attesa" perché ormai confermato
      this.indirizziInAttesa.update((lista) =>
        lista.filter((el) => el.indirizzo.id !== item.indirizzo.id),
      );
    }
  }
}
