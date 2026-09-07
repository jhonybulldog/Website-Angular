import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Competenze } from '../competenze/competenze';
import { Proggetti } from '../proggetti/proggetti';
@Component({
  imports: [Hero, About, Competenze, Proggetti],
  selector: 'app-home-c',
  styleUrl: './home-c.css',
  templateUrl: './home-c.html',
})
export class HomeC {}
