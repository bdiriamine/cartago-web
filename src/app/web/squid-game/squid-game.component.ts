import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MinigamesService } from 'src/app/services/minigames.service';

@Component({
  selector: 'app-squid-game',
  templateUrl: './squid-game.component.html',
  styleUrls: ['./squid-game.component.css']
})
export class SquidGameComponent implements OnInit {
  fbGames:any;
  token: any
  constructor(private mini: MinigamesService,
    private toastrServ: ToastrService
    ) { }

  ngOnInit(): void {
    this.mini.getfbgames().subscribe((res : any) => {this.fbGames = res.data})
  }
  opengamemin(lien :string) {
    window.location.href = lien
  }
}
