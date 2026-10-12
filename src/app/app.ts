import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './navbar/navbar'
import { Footer } from './footer/footer';
import { Notification } from './pages/shop/notification/notification';
@Component({
  imports: [RouterOutlet, Navbar, Footer, Notification],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('jhonnyfoliio');
}
