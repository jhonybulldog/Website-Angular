import { Component, signal, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '../pages/admin/login/login.service';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  menuOpen = signal(false);
  menuUtenteOpen = signal(false);

  private Login = inject(LoginService);
  private router = inject(Router);

  toggleMenu() {
    this.menuOpen.update((aperto) => !aperto);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  toggleMenuUtente() {
    this.menuUtenteOpen.update((aperto) => !aperto);
  }

  closeMenuUtente() {
    this.menuUtenteOpen.set(false);
  }

  isLoggedIn(): boolean {
    return this.Login.isLoggedIn();
  }

  logout(): void {
    this.Login.logout();
    this.router.navigate(['/']);
  }
}