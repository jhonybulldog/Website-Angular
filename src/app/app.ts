import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './Layout/navbar/navbar';
import { Footer } from './Layout/footer/footer';
import { Notification } from './core/notification/notification';
@Component({
  imports: [RouterOutlet, Navbar, Footer, Notification],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('jhonnyfoliio');
}
