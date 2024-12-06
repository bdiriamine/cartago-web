import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './core/services/auth.service';
import io from 'node_modules/socket.io-client/dist/socket.io';
import { SocketServService } from './core/services/socket-serv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  name = 'Angular';
  isLoggedIn = false;
  public screenWidth: any;
  loader = false;
  maintenance: any;
  currentRoot
  maintenanceSocketBol: boolean;
  SOC_URL = environment.socket;
  status
  socket: io.Socket;
  inMaintenance: any


  constructor(private router: Router, 
    public translate: TranslateService, 
    private authServ: AuthService, 
    private socketServ: SocketServService,
    private modalServ: NgbModal) {
    this.authServ.castSignedIn.subscribe((res: any) => {
      if (res == true) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })

    this.socketServ.connect()
    this.socketServ.getStatus()
    this.socketServ.statuSite.subscribe((data: any) => {   
      this.inMaintenance = data
      this.authServ.InMaintenance.next(this.inMaintenance)
      this.authServ.maintenance = this.inMaintenance
      if (this.inMaintenance) {
        this.router.navigate(["maintenance"])
        this.modalServ.dismissAll();
      }
      if (this.status == false) {
        if (this.router.url === "/maintenance") {
          this.router.navigate(["/"])
        }
      }
    })


    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    this.screenWidth = window.innerWidth;


    // if (this.screenWidth <= 991) {
    //   window.location.href = "https://m.carthagobet.tn";
    // }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
        this.currentRoot = event.url;
        this.authServ.root.next(this.currentRoot)

      });

  }

  ngOnInit() {




  }
  onActivate(event) {
    window.scroll(0, 0);

  }


}
