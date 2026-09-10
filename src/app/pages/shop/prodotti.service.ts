import { Injectable } from '@angular/core';

export interface ListaProdotti{
    id: number
    nome: string
    prezzo: number
    immagine: string
}


@Injectable()
export class Prodotti {

    prod: ListaProdotti[] =[
        {
            id: 1,
            nome: 'tastiera',
            prezzo: 50,
            immagine: '',
        },
        {
            id: 2,
            nome: 'mouse',
            prezzo: 30,
            immagine: '',
        },
        {
            
            id: 3,
            nome: 'tappetino',
            prezzo: 15,
            immagine: '',
        },
    ];

    
}
