import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup
  showPassword = false;

  constructor(
    private authServ: AuthService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal

  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  close() {
    this.modalService.dismissAll()
  }
  close2() {
    this.activeModal.close();

  }

  login(event) {
    if (event.keyCode === 13) {
      this.authServ.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
      this.close2()
    }
  }
  loginn() {
    this.authServ.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
    this.close2()
  }

}
