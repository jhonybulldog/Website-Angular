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
  private Login = inject(LoginService)
  private router = inject(Router)
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


  isLoggedIn(): boolean{
    return this.Login.isLoggedIn();
  }

  logout(): void{
    this.Login.logout();
    this.router.navigate(['/']);
  }

}
