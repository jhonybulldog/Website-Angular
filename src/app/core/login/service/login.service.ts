import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CartService } from "../../../pages/shop/service/cart.service";
export interface User {
  id: number;
  username: string;
  created_at: string;
}
@Injectable({
  providedIn: "root",
})
export class LoginService {
  private apiUrl = "http://localhost:3000";
  private cartService = inject(CartService);
  usernameLoggato = signal<string | null>(localStorage.getItem("username"));
  constructor(private http: HttpClient) {}

  loggedIn = signal(localStorage.getItem("loggedIn") === "true");

  login(username: string, password: string) {
    return this.http.post<{ id: number }>(`${this.apiUrl}/login`, {
      username: username,
      password: password,
    });
  }

  creaAccount(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/users`, {
      username: username,
      password: password,
    });
  }

  cancellaAccount(username: string) {
    return this.http.delete(`${this.apiUrl}/users/${username}`);
  }

  //curl -X PATCH http://localhost:3000/users/mario/password -H "Content-Type: application/json" -d "{\"currentPassword\": \"password123\", \"newPassword\": \"nuovapassword456\"}"
  cambiaPassword(username: string, password: string, passwordn: string) {
    return this.http.patch(`${this.apiUrl}/users/${username}/password`, {
      currentPassword: password,
      newPassword: passwordn,
    });
  }
  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  setLoggedIn(username: string, userId: number): void {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("userId", String(userId));
    this.loggedIn.set(true);
    this.usernameLoggato.set(username);
    this.cartService.loadCart();
  }

  logout(): void {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    this.loggedIn.set(false);
    this.usernameLoggato.set(null);
    this.cartService.loadCart();
  }

  getutenti() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}