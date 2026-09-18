import { Component, signal } from "@angular/core";

@Component({
  imports: [],
  selector: "app-subnetcalc",
  styleUrl: "./subnetcalc.css",
  templateUrl: "./subnetcalc.html",
})
export class Subnetcalc {
  ip = signal<string>("");
  error = signal<string>("");
  calcolato = signal(false);

  risultato = signal({
    network: "",
    broadcast: "",
    hostMin: "",
    hostMax: "",
    hosts: 0,
    hostsFormatted: "",
    subnetMask: "",
    hostRange: "",
    cidr: 0,
    indirizzo: "",
    classe: "",
    ipBinario: "",
    maskBinario: "",
    tipo: "",
    wildcard: "",
  });

  cambiaIp(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.ip.set(value);
  }

  impostaIp(valore: string) {
    this.ip.set(valore);
    this.calcolo();
  }

  calcoloForm(event: Event) {
    event.preventDefault();
    this.calcolo();
  }

  calcolo() {
    this.error.set("");
    const valore = this.ip().trim();

    if (!valore) {
      this.error.set("Inserisci un indirizzo IP con CIDR (es. 192.168.1.50/24)");
      this.calcolato.set(false);
      return;
    }

    if (!valore.includes("/")) {
      this.error.set("Inserisci la subnet mask CIDR (es. /24)");
      this.calcolato.set(false);
      return;
    }

    const parti = valore.split("/");
    if (parti.length !== 2) {
      this.error.set("Formato non valido. Usa il formato IP/CIDR (es. 192.168.1.50/24)");
      this.calcolato.set(false);
      return;
    }

    const [indirizzo, cidrStr] = parti;

    if (cidrStr.trim() === "") {
      this.error.set("Inserisci il valore del CIDR (es. /24)");
      this.calcolato.set(false);
      return;
    }

    const numerocidr = Number(cidrStr.trim());
    if (isNaN(numerocidr) || !Number.isInteger(numerocidr) || numerocidr < 0 || numerocidr > 32) {
      this.error.set("CIDR non valido (deve essere un numero intero tra 0 e 32)");
      this.calcolato.set(false);
      return;
    }

    const valorip = indirizzo.trim().split(".");
    if (valorip.length !== 4) {
      this.error.set("Indirizzo IP non valido (deve contenere 4 ottetti separati da punti)");
      this.calcolato.set(false);
      return;
    }

    for (const octet of valorip) {
      if (!/^\d+$/.test(octet)) {
        this.error.set("Indirizzo IP non valido (ciascun ottetto deve contenere solo cifre)");
        this.calcolato.set(false);
        return;
      }
      const num = Number(octet);
      if (num < 0 || num > 255) {
        this.error.set("Indirizzo IP non valido (ciascun ottetto deve essere tra 0 e 255)");
        this.calcolato.set(false);
        return;
      }
    }

    const numerip = valorip.map(Number);

    const maschera = [0, 0, 0, 0];
    const ottettiPieni = Math.floor(numerocidr / 8);
    const bitRimanenti = numerocidr % 8;

    for (let i = 0; i < ottettiPieni; i++) {
      maschera[i] = 255;
    }
    if (bitRimanenti > 0 && ottettiPieni < 4) {
      maschera[ottettiPieni] = 256 - Math.pow(2, 8 - bitRimanenti);
    }

    const network = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      network[i] = numerip[i] & maschera[i];
    }

    const wildcard = maschera.map((num) => 255 - num);

    const broadcast = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      broadcast[i] = network[i] | wildcard[i];
    }

    const networkString = network.join(".");
    const broadcastString = broadcast.join(".");
    const subnetMask = maschera.join(".");
    const wildcardString = wildcard.join(".");

    let hosts = Math.pow(2, 32 - numerocidr) - 2;
    let hostMin = [...network];
    let hostMax = [...broadcast];
    let hostRange = "";

    if (numerocidr === 31) {
      hosts = 2;
      hostMin = [...network];
      hostMax = [...broadcast];
      hostRange = `${hostMin.join(".")} - ${hostMax.join(".")}`;
    } else if (numerocidr === 32) {
      hosts = 1;
      hostMin = [...network];
      hostMax = [...network];
      hostRange = hostMin.join(".");
    } else {
      hostMin = this.aggiungiUno([...network]);
      hostMax = this.sottraiUno([...broadcast]);
      hostRange = `${hostMin.join(".")} - ${hostMax.join(".")}`;
    }

    const primoOttetto = numerip[0];
    let classe = "";
    if (primoOttetto >= 0 && primoOttetto <= 127) {
      classe = primoOttetto === 127 ? "A (Loopback)" : primoOttetto === 0 ? "A (Riservato)" : "A";
    } else if (primoOttetto >= 128 && primoOttetto <= 191) {
      classe = "B";
    } else if (primoOttetto >= 192 && primoOttetto <= 223) {
      classe = "C";
    } else if (primoOttetto >= 224 && primoOttetto <= 239) {
      classe = "D (Multicast)";
    } else if (primoOttetto >= 240 && primoOttetto <= 255) {
      classe = "E (Sperimentale)";
    }

    let tipo = "Pubblico";
    if (numerip[0] === 10) {
      tipo = "Privato (RFC 1918)";
    } else if (numerip[0] === 172 && numerip[1] >= 16 && numerip[1] <= 31) {
      tipo = "Privato (RFC 1918)";
    } else if (numerip[0] === 192 && numerip[1] === 168) {
      tipo = "Privato (RFC 1918)";
    } else if (numerip[0] === 127) {
      tipo = "Loopback";
    } else if (numerip[0] === 169 && numerip[1] === 254) {
      tipo = "Link-Local (APIPA)";
    } else if (numerip[0] === 100 && numerip[1] >= 64 && numerip[1] <= 127) {
      tipo = "Carrier-Grade NAT (CGNAT)";
    } else if (numerip[0] >= 224 && numerip[0] <= 239) {
      tipo = "Multicast";
    } else if (numerip[0] >= 240) {
      tipo = "Riservato / Sperimentale";
    } else if (numerip[0] === 0) {
      tipo = "Riservato";
    }

    const ipBinarioString = numerip.map((num) => num.toString(2).padStart(8, "0")).join(".");
    const maskBinarioString = maschera.map((num) => num.toString(2).padStart(8, "0")).join(".");

    this.risultato.set({
      subnetMask: subnetMask,
      network: networkString,
      broadcast: broadcastString,
      hosts: hosts,
      hostsFormatted: hosts.toLocaleString("it-IT"),
      hostMin: hostMin.join("."),
      hostMax: hostMax.join("."),
      hostRange: hostRange,
      cidr: numerocidr,
      indirizzo: indirizzo.trim(),
      classe: classe,
      ipBinario: ipBinarioString,
      maskBinario: maskBinarioString,
      tipo: tipo,
      wildcard: wildcardString,
    });

    this.calcolato.set(true);
  }

  sottraiUno(ip: number[]): number[] {
    const ris = [...ip];
    for (let i = 3; i >= 0; i--) {
      if (ris[i] > 0) {
        ris[i]--;
        break;
      }
      ris[i] = 255;
    }
    return ris;
  }

  aggiungiUno(ip: number[]): number[] {
    const ris = [...ip];
    for (let i = 3; i >= 0; i--) {
      if (ris[i] < 255) {
        ris[i]++;
        break;
      }
      ris[i] = 0;
    }
    return ris;
  }
}
