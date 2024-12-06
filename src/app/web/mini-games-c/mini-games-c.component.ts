import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { MinigamesService } from 'src/app/services/minigames.service';

@Component({
  selector: 'app-mini-games-c',
  templateUrl: './mini-games-c.component.html',
  styleUrls: ['./mini-games-c.component.css']
})
export class MiniGamesCComponent implements OnInit {
  maint: boolean;
  title = "Mini Games";

  ngOnInit(): void {
  }

  constructor(
  ) {

  }


}
