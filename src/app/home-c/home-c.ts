import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Competenze } from '../competenze/competenze';
import { Proggetti } from '../proggetti/proggetti';
import { Contatti } from '../contatti/contatti';
@Component({
  imports: [Hero, About, Competenze, Proggetti, Contatti],
  selector: 'app-home-c',
  styleUrl: './home-c.css',
  templateUrl: './home-c.html',
})
export class HomeC {}
