# Jhonnyfolio

> Portfolio personale costruito con Angular, con area amministrativa, backend REST, e-commerce con carrello, checkout e dashboard utente, Dex Pokémon e calcolatore di subnetting IPv4.

<div align="center">

![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

## Panoramica

**Jhonnyfolio** è un progetto di apprendimento e portfolio personale realizzato in Angular. Oltre alle sezioni classiche di un portfolio, include un'area e-commerce completa di catalogo prodotti, mini-carrello, pagina carrello, procedura di checkout avanzata e dashboard utente (con profilo, storico ordini e preferenze categorie), una dashboard amministrativa protetta da route guard, un backend Express con database SQLite per la gestione degli account, un Dex Pokémon e un calcolatore di subnetting IPv4.

Il progetto sfrutta le più recenti funzionalità di Angular: componenti standalone, lazy loading delle rotte, Angular Signals e computed signals per la reattività dello stato, Reactive Forms con validazione e comunicazione HTTP REST con il backend.

## Funzionalità

### Portfolio pubblico

- Hero, presentazione personale, competenze, progetti, contatti e footer.
- Navigazione responsive con navbar fissa e link di scorrimento rapido.
- Form di contatto basato su Reactive Forms e integrazione Formspree.

### Dex Pokémon

- Ricerca Pokémon per nome o numero identificativo.
- Calcolo e visualizzazione di debolezze, resistenze, immunità ed efficacia dei tipi.
- Disponibile su `/Dex`.

### Calcolatore di Subnetting IPv4

- Calcolo in tempo reale dei parametri di rete a partire da un indirizzo IPv4 in notazione CIDR.
- Validazione completa dell'input con messaggi di errore contestuali.
- Calcolo automatico alla digitazione o tramite pulsante dedicato.
- Chip preimpostati per testare rapidamente configurazioni comuni (`192.168.1.0/24`, `10.0.0.0/16`, `172.16.0.0/12`).
- Parametri calcolati: Network, Broadcast, Subnet Mask, Wildcard Mask, Host Min/Max, Host Range, numero di host utilizzabili.
- Identificazione della classe IPv4 (A–E) e della tipologia di indirizzo (Privato RFC 1918, Loopback, Link-Local APIPA, CGNAT, Multicast, Riservato, Pubblico).
- Rappresentazione in formato binario di indirizzo IP e Subnet Mask.
- Supporto per le subnet speciali `/31` (RFC 3021 punto-punto) e `/32` (host singolo).
- Disponibile su `/calc`.

### Shop, Carrello e Checkout

- **Catalogo prodotti (`/shop`)**: griglia prodotti reattiva con categorie dinamiche, badge di categoria e filtri.
- **Dettaglio prodotto (`/shop/:id`)**: scheda informativa del prodotto con navigazione rapida per tornare allo shop o accedere alla dashboard.
- **Mini-carrello flottante (`app-minicart`)**: componente sticky/flottante sempre accessibile nello shop con conteggio articoli, totale parziale e accesso diretto al carrello.
- **Pagina Carrello (`/shop/cart`)**: riepilogo dettagliato degli articoli con incremento/decremento quantità, rimozione prodotti e calcolo totale computed.
- **Procedura di Checkout (`/checkout`)**:
  - Gestione reattiva degli indirizzi di spedizione (aggiunta, modifica, eliminazione e assegnazione intestatario).
  - Selezione del metodo di pagamento (carta di credito/debito con form e validazione CVV, contrassegno, PayPal).
  - Calcolo dinamico di subtotale, spese di spedizione e totale complessivo dell'ordine.
  - Finalizzazione con salvataggio dell'ordine tramite `OrdiniService`, svuotamento automatico del carrello e notifica d'ordine confermato con animazione moderna.

### Dashboard Utente

- **Pagina dedicata (`/dashboard`)**: accessibile dallo shop e dalla scheda dettaglio prodotto.
- **Profilo Utente**: visualizzazione dati utente con avatar, nome, email e stato account.
- **Storico Ultimi Acquisti**: elenco cronologico degli ordini effettuati con identificativo, data e ora, riepilogo articoli acquistati (prezzo unitario e quantità), indirizzo di consegna, metodo di pagamento e totale pagato.
- **Preferenze Categorie**: form interattivo per impostare il livello di preferenza su tutte le categorie disponibili (con dropdown alimentato da computed signal reattivo) e tabella di riepilogo con possibilità di aggiornamento.
- **Gestione in-memory reattiva**: ordini e preferenze operano interamente tramite Angular Signals in memoria per una demo istantanea e fluida.

### Area Amministrativa

- Login autenticato tramite backend REST su `/login`.
- Protezione della rotta `/admin` tramite `authGuard`.
- Elenco degli account registrati nel database SQLite.
- Creazione ed eliminazione di account operatore.
- Modifica sicura della password utente.
- Inserimento di nuovi prodotti e categorie per il catalogo dello shop.
- Logout e memorizzazione dello stato di sessione.

## Screenshot

### E-commerce

![Anteprima e-commerce](public/e-commerce.png)

### Dex Debolezze Pokémon

![Dex Debolezze](public/DexDebolezze.png)

### Altri progetti del portfolio

| Calcolatore di subnetting | Task Manager |
| --- | --- |
| ![Calcolatore di Subnetting](public/calcsubb.png) | ![Task Manager](public/taskmanager.png) |

## Stack tecnologico

| Area | Tecnologie |
| --- | --- |
| **Frontend** | Angular 22, TypeScript 6, HTML5, CSS3, RxJS |
| **Reattività e Stato** | Angular Signals (`signal`, `computed`), Reactive Forms |
| **Routing** | Angular Router, Standalone Components, Lazy Loading, Route Guards |
| **Backend** | Node.js, Express 5, CORS |
| **Database** | SQLite, better-sqlite3 |
| **Sicurezza Password** | bcrypt |
| **Servizi Esterni** | Formspree |

## Architettura del Progetto

```text
src/app/
├── about/                     # Presentazione personale
├── competenze/                # Competenze tecniche
├── contatti/                  # Form di contatto (Formspree)
├── footer/                    # Footer con social e copyright
├── hero/                      # Hero section principale
├── home-c/                    # Container homepage portfolio
├── navbar/                    # Barra di navigazione responsive e logout
├── proggetti/                 # Sezione progetti del portfolio
├── pages/
│   ├── admin/
│   │   ├── guards/            # authGuard per la protezione rotte
│   │   ├── login/             # LoginService e vista di login
│   │   └── admin.*            # Dashboard amministrativa (utenti e prodotti)
│   ├── dex/
│   │   ├── dex.*              # Componente Dex Pokémon
│   │   └── dex.service.ts     # Servizio per tipi, debolezze ed efficacia
│   ├── shop/
│   │   ├── carrello/          # CartService e pagina carrello
│   │   ├── checkout/          # Procedura di checkout e conferma ordine
│   │   ├── dashboard/         # Dashboard utente (profilo, ordini, preferenze)
│   │   ├── minicart/          # Mini-carrello flottante
│   │   ├── productcard/       # Card riutilizzabile per i prodotti
│   │   ├── productdetail/     # Scheda dettaglio singolo prodotto
│   │   ├── ordini.service.ts  # Servizio ordini reattivo (Signals)
│   │   ├── prodotti.service.ts# Servizio catalogo prodotti e categorie
│   │   └── shop.*             # Pagina principale catalogo
│   └── subnetcalc/
│       └── subnetcalc.*       # Calcolatore di subnetting IPv4
├── app.routes.ts              # Definizione e lazy loading delle rotte
├── app.config.ts              # Provider globali (Router, HttpClient)
├── app.ts                     # Root component
└── app.html                   # Root template con router-outlet

backend/
├── server.js                  # API REST Express
├── database.js                # Connessione e inizializzazione SQLite
└── createuser.js              # Script CLI per generare utenti iniziali
```

## Rotte dell'Applicazione

| Rotta | Descrizione | Accesso |
| --- | --- | --- |
| `/` | Homepage portfolio | Pubblico |
| `/Dex` | Dex Debolezze Pokémon | Pubblico |
| `/calc` | Calcolatore di subnetting IPv4 | Pubblico |
| `/shop` | Catalogo prodotti e-commerce | Pubblico |
| `/shop/:id` | Scheda dettaglio del singolo prodotto | Pubblico |
| `/shop/cart` | Pagina carrello con gestione articoli | Pubblico |
| `/checkout` | Procedura di pagamento e checkout | Pubblico |
| `/dashboard` | Dashboard utente (profilo, ultimi acquisti, preferenze) | Pubblico |
| `/login` | Accesso all'area amministrativa | Pubblico |
| `/admin` | Dashboard amministrativa (utenti, prodotti) | Protetto (`authGuard`) |

> Qualsiasi rotta non censita viene reindirizzata automaticamente alla homepage (`**` → `/`).

## Avvio del Progetto

### Prerequisiti

- Node.js (v22 o superiore per compatibilità Angular CLI)
- npm

### 1. Frontend Angular

Dalla cartella principale del repository:

```bash
npm install
npm start
```

L'applicazione sarà accessibile all'indirizzo:

```text
http://localhost:4200
```

Per generare la build di produzione:

```bash
npm run build
```

### 2. Backend Express

In un terminale separato:

```bash
cd backend
npm install
node server.js
```

Il server Express rimarrà in ascolto sulla porta:

```text
http://localhost:3000
```

È possibile verificare il corretto funzionamento del backend con:

```bash
curl http://localhost:3000/ping
```

Risposta attesa:

```json
{ "message": "pong" }
```

> Il frontend comunica con il backend all'indirizzo `http://localhost:3000`. Se il backend non è avviato, le funzionalità di login e gestione utenti admin non saranno disponibili.

## API REST

| Metodo | Endpoint | Descrizione |
| --- | --- | --- |
| `GET` | `/ping` | Verifica dello stato del server |
| `GET` | `/users` | Restituisce la lista degli account (hash escluso) |
| `POST` | `/users` | Registra un nuovo account amministrativo |
| `DELETE` | `/users/:username` | Cancella un account esistente |
| `PATCH` | `/users/:username/password` | Aggiorna la password dell'account |
| `POST` | `/login` | Autentica le credenziali di accesso |

### Esempio: Login

```http
POST /login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

In caso di credenziali valide, il server risponde con `200` e `{ "success": true }`.

### Esempio: Creazione Account

```http
POST /users
Content-Type: application/json

{
  "username": "nuovo-operatore",
  "password": "password-sicura"
}
```

Risposta `201` con `{ "success": true }`.

### Esempio: Modifica Password

```http
PATCH /users/nuovo-operatore/password
Content-Type: application/json

{
  "currentPassword": "password-attuale",
  "newPassword": "nuova-password-sicura"
}
```

## Gestione dello Stato Reattivo

L'applicazione fa uso intensivo della reattività offerta da **Angular Signals**:

- **`Prodotti` (`prodotti.service.ts`)**: gestisce il catalogo prodotti con signal `prod` e categorie addizionali con `categorianuove`. Permette l'aggiunta di nuovi articoli sia da form interno che da area admin.
- **`CartService` (`cart.service.ts`)**: gestisce gli articoli aggiunti al carrello con signal `carrello`. Il totale dell'ordine e il conteggio elementi sono esposti come `computed()` reattivi che si aggiornano istantaneamente.
- **`OrdiniService` (`ordini.service.ts`)**: mantiene in-memory lo storico degli ordini finalizzati tramite il signal `ordini`. Al completamento del checkout, l'ordine viene aggiunto allo storico e reso subito visibile nella Dashboard Utente.
- **In-memory by design**: catalogo, carrello e ordini operano interamente in memoria senza persistenza su storage locale, garantendo un ambiente demo pulito e ripristinabile al refresh.

## Autenticazione e Sicurezza

```text
Form Login
    │
    ▼
POST /login
    │
    ▼
Express + bcrypt + SQLite
    │
    ▼
LoginService.setLoggedIn()
    │
    ▼
localStorage + authGuard
    │
    ▼
Accesso a /admin
```

Le credenziali non vengono mai memorizzate in chiaro: il database SQLite conserva esclusivamente gli hash crittografici calcolati da bcrypt.

## Database

Il backend inizializza automaticamente il file SQLite `backend/data.db` e la tabella `users` al primo avvio:

```text
users
├── id              INTEGER PRIMARY KEY AUTOINCREMENT
├── username        TEXT UNIQUE NOT NULL
├── password_hash   TEXT NOT NULL
└── created_at      TEXT DEFAULT CURRENT_TIMESTAMP
```

Per creare un primo utente di prova tramite script:

```bash
cd backend
node createuser.js
```

## Roadmap

### Completato

- [x] Portfolio responsive in Angular con navigazione a sezioni.
- [x] Routing con lazy loading dei componenti standalone.
- [x] Reattività moderna tramite Angular Signals e computed signals.
- [x] Dex Pokémon con calcolo debolezze, resistenze ed efficacia tipi.
- [x] Calcolatore di subnetting IPv4 completo con classificazione, notazione CIDR e formato binario.
- [x] Supporto subnet `/31` (RFC 3021) e `/32`.
- [x] Backend Express 5 e database SQLite con bcrypt.
- [x] Autenticazione con route guard protetta (`authGuard`).
- [x] Area amministrativa per gestione account, prodotti e categorie.
- [x] Catalogo e-commerce con schede prodotto, filtri e ricerca.
- [x] Mini-carrello flottante e pagina carrello dedicata.
- [x] Flusso di checkout completo con gestione indirizzi di spedizione e metodi di pagamento.
- [x] Dashboard utente (`/dashboard`) con dati profilo, storico acquisti e preferenze categorie.
- [x] Servizio ordini reattivo (`OrdiniService`) sincronizzato con il checkout e la dashboard.
- [x] Notifica di conferma ordine con animazione grafica.
- [x] Collegamenti di navigazione rapida tra shop, dettaglio prodotto e dashboard utente.

### Possibili Evoluzioni Future

- [ ] Persistenza di prodotti e ordini su database backend / cloud.
- [ ] Integrazione di un gateway di pagamento reale (Stripe / PayPal SDK).
- [ ] Autenticazione avanzata con JWT (JSON Web Tokens) e refresh token.
- [ ] Filtro avanzato e ordinamento prodotti per prezzo, categoria e disponibilità.
- [ ] Dark mode con switch di tema dinamico.
- [ ] Supporto IPv6 per il calcolatore di subnetting.
- [ ] Suite di test unitari e di integrazione per componenti e servizi.

## Autore

**Jhonny** — portfolio personale e progetto per l'apprendimento delle architetture moderne con Angular, TypeScript, Node.js ed Express.

---

<div align="center">

Realizzato con Angular, TypeScript, Node.js ed Express.

</div>
