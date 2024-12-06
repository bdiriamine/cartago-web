

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGuard {
  // urlMaintenance = environment.apiUrl + "maintenance_mode"
  status: any;
  InMaintenance
  constructor(private router: Router, private http: HttpClient, private authServ: AuthService) { }

  canActivate(): boolean {
    this.authServ.InMaintenance.subscribe(res => {
      this.InMaintenance = res

    })
    if (this.InMaintenance == undefined) {
      this.InMaintenance = this.authServ.maintenance
    }

    if (this.InMaintenance == true) {
      this.router.navigate(["maintenance"])

      return false;
    }

    return true;
  }
}


