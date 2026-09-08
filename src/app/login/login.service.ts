import { Injectable, inject, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class LoginService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  private loggedIn = signal(localStorage.getItem("loggedIn") === "true");

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {
      username: username,
      password: password,
    });
  }

  creaAccount(username: string , password: string){
    return this.http.post(`${this.apiUrl}/users`,{
      
      username: username,
      password: password,
      
      });
  }

  cancellaAccount(username: string){
    return this.http.delete(`${this.apiUrl}/users/${username}`)
  }
  isLoggedIn(): boolean {
    return this.loggedIn();
  }

    setLoggedIn(): void {
    localStorage.setItem("loggedIn", "true");
    this.loggedIn.set(true);
  }

  logout(): void {
    localStorage.removeItem("loggedIn");
    this.loggedIn.set(false);
  }
}
