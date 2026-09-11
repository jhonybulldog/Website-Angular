# Jhonnyfolio

> Portfolio personale costruito con Angular, con area amministrativa, backend REST e una piccola esperienza e-commerce con carrello.

<div align="center">

![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

## Panoramica

**Jhonnyfolio** è un progetto di apprendimento e portfolio personale realizzato in Angular. Oltre alle sezioni classiche di un portfolio, include una dashboard amministrativa protetta da guardia di navigazione, un backend Express con database SQLite per la gestione degli account e una sezione shop.

Il progetto è pensato per mettere in pratica componenti standalone, lazy loading, router, Signals, computed signals, Reactive Forms e comunicazione HTTP tra frontend e backend.

## Funzionalità

### Portfolio pubblico

- Hero, presentazione personale, competenze, progetti, contatti e footer.
- Navigazione responsive.
- Form di contatto basato su Reactive Forms e Formspree.
- Dex Pokémon con ricerca e informazioni su debolezze, resistenze, immunità ed efficacia dei tipi.

### Shop e carrello

- Catalogo prodotti disponibile su `/shop`.
- Scheda di dettaglio per ogni prodotto (`/shop/:id`).
- Inserimento di articoli nel carrello.
- Rimozione di singoli articoli e calcolo automatico del totale.
- Pulsante flottante per raggiungere rapidamente il carrello.
- Gestione dei prodotti dall’area admin.

### Area amministrativa

- Login tramite backend REST.
- Protezione della rotta `/admin` con `authGuard`.
- Elenco degli account presenti nel database.
- Creazione ed eliminazione degli account.
- Modifica della password.
- Inserimento di prodotti per lo shop.
- Logout e salvataggio dello stato di accesso in `localStorage`.

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
| Frontend | Angular 22, TypeScript, HTML5, CSS3, RxJS |
| Stato e form | Angular Signals, computed signals, Reactive Forms |
| Routing | Angular Router, lazy loading, route guard |
| Backend | Node.js, Express 5, CORS |
| Database | SQLite, better-sqlite3 |
| Sicurezza password | bcrypt |
| Servizi esterni | Formspree |

## Architettura

```text
src/app/
├── about/                     # Presentazione personale
├── competenze/                # Competenze
├── contatti/                  # Form di contatto
├── dex/                       # Dex Pokémon
├── footer/                    # Footer
├── hero/                      # Hero section
├── home-c/                    # Homepage
├── navbar/                    # Navigazione e logout
├── pages/
│   ├── admin/
│   │   ├── guards/            # authGuard
│   │   ├── login/             # LoginService e pagina login
│   │   └── admin.*            # Dashboard amministrativa
│   └── shop/
│       ├── carrello/          # CartService e pagina carrello
│       ├── productcard/       # Card prodotto
│       ├── productdetail/     # Dettaglio prodotto
│       └── prodotti.service.ts
├── proggetti/                 # Progetti portfolio
├── app.routes.ts              # Definizione rotte
└── app.config.ts              # Provider router e HttpClient

backend/
├── server.js                  # API Express
├── database.js                # Inizializzazione SQLite
└── createuser.js              # Script per creare un utente locale
```

## Rotte principali

| Rotta | Descrizione | Accesso |
| --- | --- | --- |
| `/` | Homepage portfolio | Pubblico |
| `/Dex` | Dex Debolezze Pokémon | Pubblico |
| `/login` | Pagina di login | Pubblico |
| `/shop` | Catalogo prodotti | Pubblico |
| `/shop/:id` | Dettaglio prodotto | Pubblico |
| `/shop/cart` | Carrello | Pubblico |
| `/admin` | Dashboard amministrativa | Protetto |

## Avvio del progetto

### Prerequisiti

Sono necessari:

- Node.js;
- npm;
- un terminale per il frontend e uno per il backend.

### 1. Frontend Angular

Dalla cartella principale del progetto:

```bash
npm install
npm start
```

L’app Angular è disponibile su:

```text
http://localhost:4200
```

Per creare una build di produzione:

```bash
npm run build
```

### 2. Backend Express

In un secondo terminale:

```bash
cd backend
npm install
node server.js
```

Il backend deve restare in ascolto su:

```text
http://localhost:3000
```

Puoi verificare che sia attivo con:

```bash
curl http://localhost:3000/ping
```

Risposta attesa:

```json
{ "message": "pong" }
```

> Il frontend chiama il backend all’indirizzo `http://localhost:3000`. Se il server backend non è avviato, login e gestione utenti non possono funzionare.

## API REST

| Metodo | Endpoint | Descrizione |
| --- | --- | --- |
| `GET` | `/ping` | Verifica che il server sia attivo |
| `GET` | `/users` | Restituisce gli utenti senza hash password |
| `POST` | `/users` | Crea un nuovo account |
| `DELETE` | `/users/:username` | Elimina un account |
| `PATCH` | `/users/:username/password` | Aggiorna una password |
| `POST` | `/login` | Verifica username e password |

Esempio di richiesta login:

```http
POST /login
Content-Type: application/json

{
  "username": "nome-utente",
  "password": "password"
}
```

In caso di credenziali corrette, il server restituisce una risposta `200` con `success: true`.

## Autenticazione

Il flusso è il seguente:

```text
Login form
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
/admin
```

Le password non sono salvate in chiaro: nel database viene memorizzato esclusivamente l’hash generato da bcrypt.

## Stato reattivo dello shop

`Prodotti` e `CartService` sono servizi Angular forniti a livello root e utilizzano Signals:

- `Prodotti` mantiene il catalogo e permette aggiunta, modifica ed eliminazione;
- `CartService` mantiene gli articoli scelti e permette la rimozione per indice;
- il totale del carrello è un `computed()` che somma i prezzi degli articoli.

Attualmente questi dati restano **in memoria**. Un refresh del browser azzera prodotti aggiunti e carrello: è una scelta adatta alla demo, non una persistenza definitiva.

## Database

Il backend crea automaticamente il file SQLite `backend/data.db` e la tabella `users` se non sono già presenti.

```text
users
├── id
├── username
├── password_hash
└── created_at
```

Per creare manualmente un utente di prova è disponibile lo script:

```bash
cd backend
node createuser.js
```

> Eseguilo una sola volta per lo stesso username, altrimenti SQLite segnalerà un vincolo di unicità.

## Roadmap

### Completato

- [x] Portfolio responsive in Angular.
- [x] Routing e lazy loading.
- [x] Reactive Forms e Signals.
- [x] Dex Pokémon con ricerca.
- [x] Backend Express e database SQLite.
- [x] Login, logout e route guard.
- [x] Gestione account admin.
- [x] Shop, dettaglio prodotto e carrello.
- [x] Calcolo totale e rimozione degli articoli.

### Possibili evoluzioni

- [ ] Salvare prodotti e carrello nel backend/database.
- [ ] Gestire quantità e disponibilità dei prodotti.
- [ ] Aggiungere ordini e checkout.
- [ ] Sostituire l’autenticazione locale con token o sessioni server-side.
- [ ] Migliorare i messaggi di errore e gli stati di caricamento.
- [ ] Aggiungere test per servizi, guard e componenti.

## Limiti attuali e note di sicurezza

- L’autenticazione usa un flag in `localStorage`: è utile per il progetto didattico, ma non sostituisce JWT, cookie sicuri o sessioni server-side.
- Le API utenti non hanno ancora autorizzazione lato server: in produzione vanno protette.
- Il catalogo e il carrello non sono persistenti.
- Il backend è configurato per lo sviluppo locale su porta `3000`.

## Autore

**Jhonny** — portfolio personale e progetto di apprendimento dedicato allo sviluppo web con Angular e TypeScript.

---

<div align="center">

Realizzato con Angular, TypeScript, Node.js ed Express.

</div>
