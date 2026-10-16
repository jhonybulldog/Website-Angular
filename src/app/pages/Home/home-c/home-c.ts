import { Component } from '@angular/core';
import { Hero } from '../components/hero/hero';
import { About } from '../components/about/about';
import { Competenze } from '../components/competenze/competenze';
import { Proggetti } from '../components/proggetti/proggetti';
import { Contatti } from '../components/contatti/contatti';
@Component({
  imports: [Hero, About, Competenze, Proggetti, Contatti],
  selector: 'app-home-c',
  styleUrl: './home-c.css',
  templateUrl: './home-c.html',
})
export class HomeC {}
