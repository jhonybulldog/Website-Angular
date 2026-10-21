import { Component, inject, OnInit, signal } from "@angular/core";
import { LoginService } from "../../../core/login/service/login.service";
import { BlogService } from "../../blog/service/blog.service";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: "app-dashboard",
  styleUrl: "./dashboard.css",
  templateUrl: "./dashboard.html",
  providers: [BlogService],
})
export class Dashboard {
  private loginser = inject(LoginService);


  nomeUtente = this.loginser.usernameLoggato;

  immagineProfilo = "/profile.png";
}
