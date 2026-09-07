import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {Navbar} from './navbar/navbar'
@Component({
  imports: [RouterOutlet,RouterLink, Navbar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('jhonnyfoliio');
}
