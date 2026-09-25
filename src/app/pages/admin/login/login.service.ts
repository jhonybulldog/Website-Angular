import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
  usernameLoggato = signal<string | null>(localStorage.getItem("username"));
  constructor(private http: HttpClient) {}

  loggedIn = signal(localStorage.getItem("loggedIn") === "true");

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {
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

  setLoggedIn(username: string): void {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    this.loggedIn.set(true);
    this.usernameLoggato.set(username);
  }

  logout(): void {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    this.loggedIn.set(false);
    this.usernameLoggato.set(null);
  }

  getutenti() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
