import { Injectable, inject} from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class ContattiService {
    private http = inject(HttpClient);


    inviaMessaggio(dati: any){
        return this.http.post('https://formspree.io/f/movpweqw', dati);
    }
}
