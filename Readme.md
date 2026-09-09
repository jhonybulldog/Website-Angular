# 🟢 Jhonnyfoliio — Portfolio

> Portfolio personale sviluppato con **Angular** e **TypeScript**, con una sezione amministrativa autenticata e un backend **Node.js + Express** per la gestione degli account.

<div align="center">

![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=for-the-badge\&logo=angular\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge\&logo=express\&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge\&logo=sqlite\&logoColor=white)

</div>

---

## 📖 Descrizione

**Jhonnyfoliio** è un portfolio personale realizzato con Angular.

Il progetto presenta il profilo dello sviluppatore, le competenze, una raccolta di progetti e un modulo di contatto. Oltre alla parte pubblica, è presente un'**area amministrativa protetta** collegata a un backend Node.js.

L'applicazione è stata strutturata utilizzando componenti Angular separati per le diverse sezioni del sito e utilizza il routing per gestire le pagine dell'applicazione.

### Obiettivi principali

* Realizzare un portfolio personale moderno e responsive.
* Organizzare l'applicazione Angular in componenti riutilizzabili.
* Utilizzare Reactive Forms per la gestione dei moduli.
* Collegare il frontend a un backend REST.
* Implementare un sistema di autenticazione per l'area amministrativa.
* Gestire gli account tramite un database SQLite.
* Sperimentare funzionalità Angular come **Signals**, **Computed Signals**, routing e lazy loading.

---

## ✨ Funzionalità

### 🌐 Portfolio

La pagina principale contiene:

* Hero section
* Presentazione personale
* Sezione competenze
* Portfolio dei progetti
* Sezione contatti
* Footer
* Navbar responsive

La navigazione permette di raggiungere rapidamente le varie sezioni della pagina.

### 🔐 Area amministrativa

L'applicazione dispone di una sezione `/admin` protetta da `authGuard`.

Dall'area amministrativa è possibile:

| Funzionalità            | Stato |
| ----------------------- | :---: |
| Login                   |   ✅   |
| Creazione account       |   ✅   |
| Visualizzazione account |   ✅   |
| Eliminazione account    |   ✅   |
| Modifica password       |   ✅   |
| Modifica username       |   ❌   |

Gli account vengono recuperati dal backend e visualizzati in una tabella con ID, username e data di creazione.

### 🔑 Autenticazione

Il login viene effettuato tramite il backend.

Le password non vengono salvate in chiaro: il backend utilizza **bcrypt** per generare e verificare gli hash delle password.

La rotta amministrativa viene protetta tramite un Angular `CanActivateFn`.

### 🧩 Dex Debolezze Pokémon

È presente una pagina dedicata alle interazioni tra i tipi Pokémon.

La Dex contiene i **18 tipi Pokémon** e mostra:

* debolezze;
* efficacia offensiva;
* scarsa efficacia;
* assenza di effetto;
* resistenze;
* immunità.

È inoltre disponibile una ricerca dinamica per filtrare i tipi.

### 📬 Form di contatto

Il modulo contatti utilizza Angular Reactive Forms e valida:

* nome;
* email;
* oggetto;
* messaggio.

L'invio viene effettuato tramite **Formspree**.

---

## 🛠️ Tecnologie

### Frontend

| Tecnologia               | Utilizzo                        |
| ------------------------ | ------------------------------- |
| Angular 22               | Framework frontend              |
| TypeScript               | Linguaggio principale           |
| HTML5                    | Struttura delle pagine          |
| CSS3                     | Styling e responsive design     |
| RxJS                     | Gestione delle richieste HTTP   |
| Angular Router           | Navigazione e routing           |
| Reactive Forms           | Gestione e validazione dei form |
| Angular Signals          | Stato reattivo                  |
| Angular Computed Signals | Filtraggio dinamico della Dex   |

### Backend

| Tecnologia     | Utilizzo                       |
| -------------- | ------------------------------ |
| Node.js        | Runtime                        |
| Express 5      | Server/API REST                |
| better-sqlite3 | Connessione al database        |
| SQLite         | Database                       |
| bcrypt         | Hash e verifica delle password |
| CORS           | Comunicazione frontend/backend |

### Servizi esterni

* **Formspree** — gestione dell'invio del modulo contatti.

---

## 📂 Struttura del progetto

```text
Website-Angular-main/
│
├── backend/
│   ├── createuser.js
│   ├── database.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── public/
│   ├── DexDebolezze.png
│   ├── calcsubb.png
│   ├── github.png
│   ├── logo.png
│   ├── shopify.png
│   └── taskmanager.png
│
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── admin/
│   │   ├── competenze/
│   │   ├── contatti/
│   │   ├── dex/
│   │   ├── footer/
│   │   ├── guards/
│   │   ├── hero/
│   │   ├── home-c/
│   │   ├── login/
│   │   ├── navbar/
│   │   └── proggetti/
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.css
│
├── angular.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── .gitignore
```

### Organizzazione delle feature

Le funzionalità principali sono separate in cartelle dedicate:

* `about/` — sezione personale.
* `admin/` — gestione amministrativa degli account.
* `competenze/` — competenze tecniche e di design.
* `contatti/` — form di contatto e relativo service.
* `dex/` — Dex delle debolezze Pokémon.
* `guards/` — protezione delle rotte.
* `hero/` — sezione iniziale del portfolio.
* `home-c/` — composizione della homepage.
* `login/` — login e comunicazione con il backend.
* `navbar/` — navigazione principale.
* `proggetti/` — visualizzazione dei progetti.

---

## 🚀 Installazione

### Prerequisiti

Per eseguire il progetto sono necessari:

* Node.js
* npm
* Angular CLI

Il backend utilizza Node.js e npm per installare le proprie dipendenze.

---

### ⚠️ Stato attuale della configurazione Angular

Nel repository analizzato è presente il file:

```text
package-lock.json
```

ma **non è presente il `package.json` nella root del progetto Angular**.

Di conseguenza, l'installazione standard:

```bash
npm install
```

non può essere considerata garantita nello stato attuale del repository.

Prima di eseguire il frontend è quindi necessario ripristinare o aggiungere il `package.json` della root Angular.

Il `package-lock.json` presente indica comunque le dipendenze Angular utilizzate dal progetto.

---

## ⚙️ Backend

Il backend si trova nella directory:

```text
backend/
```

Per installare le sue dipendenze:

```bash
cd backend
npm install
```

Per avviare il server:

```bash
node server.js
```

Il server viene avviato sulla porta:

```text
3000
```

quindi l'API è disponibile su:

```text
http://localhost:3000
```

---

## 🗄️ Database

Il backend utilizza **SQLite** tramite `better-sqlite3`.

Il database viene creato automaticamente dal file:

```text
backend/database.js
```

Il database utilizzato è:

```text
backend/data.db
```

La tabella principale è:

```text
users
```

con i seguenti campi:

| Campo           | Tipo    | Descrizione            |
| --------------- | ------- | ---------------------- |
| `id`            | INTEGER | Identificativo univoco |
| `username`      | TEXT    | Username dell'utente   |
| `password_hash` | TEXT    | Hash della password    |
| `created_at`    | TEXT    | Data di creazione      |

Il file `data.db` è escluso dal repository tramite `.gitignore`.

---

## 🔌 API Backend

Il backend espone attualmente le seguenti route:

| Metodo   | Endpoint                    | Funzione                                 |
| -------- | --------------------------- | ---------------------------------------- |
| `GET`    | `/ping`                     | Verifica che il server sia raggiungibile |
| `GET`    | `/users`                    | Recupera gli utenti                      |
| `POST`   | `/users`                    | Crea un nuovo account                    |
| `DELETE` | `/users/:username`          | Elimina un account                       |
| `PATCH`  | `/users/:username/password` | Cambia la password                       |
| `POST`   | `/login`                    | Effettua il login                        |

### Esempio di controllo del server

```bash
curl http://localhost:3000/ping
```

La risposta prevista dal backend è:

```json
{
  "message": "pong"
}
```

---

## 🔐 Sicurezza

Le password degli utenti vengono elaborate utilizzando **bcrypt**.

Durante la creazione di un account:

```text
password
   ↓
bcrypt
   ↓
password_hash
   ↓
SQLite
```

Durante il login, la password fornita viene confrontata con l'hash memorizzato nel database.

Il frontend utilizza inoltre un `authGuard` per impedire l'accesso alla rotta `/admin` quando l'utente non risulta autenticato.

> **Nota:** il sistema di autenticazione attuale utilizza lo stato di login memorizzato nel `localStorage`. Non è presente nel progetto un sistema JWT o una gestione di sessione server-side.

---

## 🖥️ Routing

Le rotte Angular attualmente definite sono:

| Percorso | Pagina              | Protezione  |
| -------- | ------------------- | ----------- |
| `/`      | Homepage            | Pubblica    |
| `/admin` | Area amministrativa | `authGuard` |
| `/login` | Login               | Pubblica    |
| `/Dex`   | Dex Debolezze       | Pubblica    |

Alcune pagine vengono caricate tramite **lazy loading** utilizzando `loadComponent`.

---

## 📸 Screenshot

Il progetto contiene già alcune immagini utilizzate nella sezione portfolio:

### Portfolio

![Portfolio project](public/shopify.png)

### Calcolatore di Subnetting

![Subnet calculator](public/calcsubb.png)

### Dex Debolezze

![Dex Debolezze](public/DexDebolezze.png)

### Task Manager

![Task Manager](public/taskmanager.png)

---

## 🗺️ Roadmap

### Completato

* [x] Creazione del progetto Angular
* [x] Strutturazione del portfolio
* [x] Navbar responsive
* [x] Sezione Hero
* [x] Sezione About
* [x] Sezione Competenze
* [x] Sezione Progetti
* [x] Form Contatti
* [x] Angular Reactive Forms
* [x] Routing Angular
* [x] Login
* [x] `authGuard`
* [x] Backend Express
* [x] Database SQLite
* [x] Hash delle password con bcrypt
* [x] Creazione account
* [x] Eliminazione account
* [x] Modifica password
* [x] Visualizzazione degli account
* [x] Dex delle debolezze Pokémon
* [x] Ricerca nella Dex

### Da implementare

* [ ] Modifica dello username degli account
* [ ] Miglioramento della gestione degli errori nell'interfaccia
* [ ] Miglioramento della gestione dell'autenticazione

> La roadmap contiene esclusivamente funzionalità direttamente riconducibili allo stato attuale del progetto o a funzionalità chiaramente mancanti rispetto a quelle già presenti.

---

## ⚠️ Known Issues

### `package.json` Angular mancante

Il progetto contiene il `package-lock.json` Angular ma non il relativo `package.json` nella root.

Questo deve essere sistemato prima di considerare completa la procedura di installazione del frontend.

### Autenticazione

L'autenticazione attuale è basata sullo stato salvato nel `localStorage`.

Non sono presenti JWT o sessioni server-side.

### Gestione errori

Alcune operazioni del frontend mostrano gli errori principalmente tramite messaggi e `console.log`, quindi la gestione degli errori può essere ulteriormente migliorata.

---

## 🤝 Contributi

Il progetto è principalmente un portfolio personale.

Per contribuire:

1. Effettua un fork del repository.
2. Crea un branch dedicato alle modifiche.
3. Implementa le modifiche.
4. Verifica il funzionamento del progetto.
5. Apri una Pull Request descrivendo chiaramente le modifiche effettuate.

---

## 👤 Autore

**Jhonny**

Portfolio personale e progetto di apprendimento dedicato allo sviluppo frontend con Angular e TypeScript.

---

<div align="center">

**Jhonnyfoliio**

*Made with Angular & TypeScript*

</div>
