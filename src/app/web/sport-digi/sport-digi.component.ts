import { Component , OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sport-digi',
  templateUrl: './sport-digi.component.html',
  styleUrls: ['./sport-digi.component.css']
})
export class SportDigiComponent implements OnInit {
  isLoggedIn = false
  token: string;
  iframSport:SafeResourceUrl;
  constructor(private authServ: AuthService,private _sanitizationService: DomSanitizer) {
    this.authServ.getip()
  }


  ngOnInit(): void {
   
    if (localStorage.getItem('accessToken') != null && localStorage.getItem('accessToken') != undefined) {
      // this.element7.style.display = "none"
      this.isLoggedIn = true;
      setTimeout(() => {
        this.token = localStorage.getItem("accessToken")
        this.authServ.sportDIGI(1).subscribe((res: any) => {
          var script = document.createElement("script");
          script.innerHTML = `    (function (d, s, id) { function startGameLoader() { function SportLogin() { alert('SportLogin'); }; function SportRegistration() {
            alert('SportRegistration');
        }; var _sp = []; 
       _sp.push(['server', 'https://sport.carthagobet.tn/']); 
       _sp.push(['partner', '153']); 
       _sp.push(['language', 'fr']); 
       _sp.push(['device', 'd']); 
       _sp.push(['timezone', '0']); 
       _sp.push(['currentPage', '0']); 
       _sp.push(['login', 'SportLogin']); 
       _sp.push(['registration', 'SportRegistration']); 
       _sp.push(['eventId', '']); 
       _sp.push(['unHideOverflow', '1']); 
       _sp.push(['newVersion', '1']); 
       _sp.push(['token', '`+res.data+`']); 
       SportFrame.frame(_sp); }; var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            startGameLoader(); 
       } else {
            js = d.createElement(s); js.id = id;
        js.src = 'https://sport.carthagobet.tn/js/Partner/IntegrationLoader.js';
        fjs.parentNode.insertBefore(js, fjs); js.onload = startGameLoader; } })(document, 'script', 'fundist-digitain-loader'); 
          `;
          document.body.appendChild(script);
        })
      }, 100);
} else {

setTimeout(() => {
  
  var script = document.createElement("script");
          script.innerHTML = `    (function (d, s, id) { function startGameLoader() { function SportLogin() { alert('SportLogin'); }; function SportRegistration() {
            alert('SportRegistration');
        }; var _sp = []; 
       _sp.push(['server', 'https://sport.carthagobet.tn/']); 
       _sp.push(['partner', '153']); 
       _sp.push(['language', 'fr']); 
       _sp.push(['device', 'd']); 
       _sp.push(['timezone', '0']); 
       _sp.push(['currentPage', '0']); 
       _sp.push(['login', 'SportLogin']); 
       _sp.push(['registration', 'SportRegistration']); 
       _sp.push(['eventId', '']); 
       _sp.push(['unHideOverflow', '1']); 
       _sp.push(['newVersion', '1']); 
       SportFrame.frame(_sp); }; var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            startGameLoader(); 
       } else {
            js = d.createElement(s); js.id = id;
        js.src = 'https://sport.carthagobet.tn/js/Partner/IntegrationLoader.js';
        fjs.parentNode.insertBefore(js, fjs); js.onload = startGameLoader; } })(document, 'script', 'fundist-digitain-loader'); 
          `;
          document.body.appendChild(script);
}, 100);


}
    
  }

}


