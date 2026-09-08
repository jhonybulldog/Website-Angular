import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-proggetti',
  styleUrl: './proggetti.css',
  templateUrl: './proggetti.html',
})
export class Proggetti {
  Progetti = [
    {
      immagine: '/shopify.png',
      titolo: 'Piattaforma E-commerce',
      descrizione:
        'Soluzione completa di e-commerce con gestione prodotti, carrello dinamico, sistema di checkout e dashboard amministrativa.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      link: '#Contatti',
      testoLink: 'Più Info',
    },
    {
      immagine: '/calcsubb.png',
      titolo: 'Calcolatore di Subnetting',
      descrizione:
        'Strumento web per calcolare parametri di rete da un indirizzo IP con notazione CIDR. Fornisce subnet mask, indirizzi di rete, broadcast, host disponibili e rappresentazioni binarie.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'RetiIP'],
      link: '/calc',
      testoLink: 'Provalo Ora',
    },
    {
      immagine: '/github.png',
      titolo: 'Repository Git Hub',
      descrizione: 'Collezione completa dei miei proggetti open-source e personali, include strumenti webm script di automazione e proggetti di apprendimento',
      tech: ['git'],
      link: 'https://github.com/jhonybulldog',
      testoLink: 'Vedi Github',
    },
    {
      immagine: '/DexDebolezze.png',
      titolo: 'Dex Debolezze / guida pokemon',
      descrizione: "Dex Debolezze è il tuo strumento definitivo per le battaglie Pokémon. Consulta la tabella delle debolezze interattiva, calcola i matchup in tempo reale e analizza la copertura del tuo team. In più, trova una guida Nuzlocke pratica con consigli, strategie e checklist per ogni area, per trasformare ogni giocata in un'epica sopravvivenza.",
      tech: ['HTML5','CSS3','Typescript'],
      link: '/Dex',
      link2: '/Guida',
      testoLink: 'Dex Debolezze',
      testoLink2: 'Guida Nuzlocke',
    },
    {
      immagine: '/taskmanager.png',
      titolo: 'Task-Manager',
      descrizione: ' Task manager con categorie personalizzabile, priorità drag & drop. Salvataggio automatico nel browser',
      tech: ['HTML5', 'CSS3', 'Javascript'],
      link: '/task',
      testoLink: 'Task-Manager',
    },
  ];
}
