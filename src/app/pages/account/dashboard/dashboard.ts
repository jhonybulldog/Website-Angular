import { Component, inject, OnInit, signal } from "@angular/core";
import { LoginService } from "../../../core/login/service/login.service";
import { BlogService } from "../../blog/service/blog.service";
import { RouterLink, RouterLinkActive } from "@angular/router";
@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: "app-dashboard",
  styleUrl: "./dashboard.css",
  templateUrl: "./dashboard.html",
  providers: [BlogService],
})
export class dashboard {
  private loginser = inject(LoginService);


  nomeUtente = this.loginser.usernameLoggato;

  immagineProfilo = "/profile.png";
}
