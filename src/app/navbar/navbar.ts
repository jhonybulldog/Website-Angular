import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  menuOpen = signal(false);

  toggleMenu() {
    if (this.menuOpen()) {
      this.menuOpen.set(false);
    } else {
      this.menuOpen.set(true);
    }
  }

  closeMenu() {
   this.menuOpen.set(false)
  }
}
