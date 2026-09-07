import { Component } from '@angular/core';

export interface Skill{
  name: string;
}
export interface Skillcat{
  name: string;
}
@Component({
  imports: [],
  selector: 'app-competenze',
  styleUrl: './competenze.css',
  templateUrl: './competenze.html',
})
export class Competenze {
  skills: Skill[] = [
    {name: 'HTML/CSS'},
    {name: 'javascript'},
    {name: 'angular'},
  ];

  skillcat: Skillcat[] = [
    { name: 'UI/UX Design'},
    { name: 'Figma'},
    {name: 'Adobe Creative Suite'},
  ]
}
