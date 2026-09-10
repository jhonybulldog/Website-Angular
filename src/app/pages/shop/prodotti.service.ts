import { Injectable } from '@angular/core';

export interface ListaProdotti{
    id: number
    nome: string
    desc: string
    prezzo: number
    immagine: string
}


@Injectable()
export class Prodotti {

    prod: ListaProdotti[] =[
        {
            id: 1,
            nome: 'tastiera',
            desc: 'tastiera da gaming compatibile con qualsiasi tipo di computer',
            prezzo: 50,
            immagine: '/prodotti/tastiera.jpeg',
        },
        {
            id: 2,
            nome: 'mouse',
            desc: 'mouse da gaming compatibile con qualsiasi tipo di computer',
            prezzo: 30,
            immagine: '/prodotti/mouse.jpeg',
        },
        {
            
            id: 3,
            nome: 'tappetino',
            desc: 'tappetino da gaming di buona fattura',
            prezzo: 15,
            immagine: '/prodotti/tappetino.jpeg',
        },
    ];   
}
