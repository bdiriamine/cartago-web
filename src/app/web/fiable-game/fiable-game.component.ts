import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { MinigamesService } from 'src/app/services/minigames.service';

@Component({
  selector: 'app-fiable-game',
  templateUrl: './fiable-game.component.html',
  styleUrls: ['./fiable-game.component.css']
})
export class FiableGameComponent implements OnInit {
  token: any;
  fbGames:any
  constructor(     private toastrServ: ToastrService,private authServ: AuthService,private miniS : MinigamesService) {
    this.authServ.tokenn.subscribe((res: any) => {

      if (res) {
        this.token = res
      }
    })
    if (!this.token) {

      this.token = localStorage.getItem("accessToken")

    }


   }

  ngOnInit(): void {
    this.miniS.getfbgames().subscribe((res : any) => {this.fbGames = res.data})}
  
    openModal(gameurl) {
      if (this.token) {
        console.log(gameurl)
        this.miniS.openGamefiable(gameurl).subscribe((res: any)=>{
          window.location.href = res.data
    
      })} else {
        this.toastrServ.info("You have to login before you play");
      }
   
    }
}
