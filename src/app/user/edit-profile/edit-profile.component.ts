import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/services/userService/user.service';
import { FileModalComponent } from 'src/app/web/file-modal/file-modal.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userId;
  userForm: FormGroup;
  pwForm: FormGroup;
  hasUploaded
  checked
  constructor(private userServ: UserService, private router: Router, private toastr: ToastrService, private translateService: TranslateService, private modalService: NgbModal, private authServ: AuthService) { }
  user = {
    "phone": '',
    "username": '',
    "firstname": '',
    "lastname": '',
    "email": '',
    "cin": '',
    "country": '',
    "adresse": ''
  }
  pw = {
    "old_password": '',
    "new_password": '',
  }

  hasUploadeImage: boolean;

  ngOnInit(): void {
    this.hasUploadeImage = this.authServ.hasUploadedId;

    this.getUser();

    this.userForm = new FormGroup({
      username: new FormControl({ value: '', disabled: true }),
      firstname: new FormControl({ value: '', disabled: true }),
      lastname: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: true }, Validators.email),
      country: new FormControl({ value: '', disabled: true }),
      tel: new FormControl(''),
      adresse: new FormControl(''),
      cin: new FormControl({ value: '', disabled: true })
    })
    this.pwForm = new FormGroup({
      old_password: new FormControl(),
      new_password: new FormControl(),

    })
  }
  updateProfile() {
    this.user.phone = this.userForm.controls['tel'].value
    this.user.username = this.userForm.controls['username'].value
    this.user.firstname = this.userForm.controls['firstname'].value
    this.user.lastname = this.userForm.controls['lastname'].value
    this.user.email = this.userForm.controls['email'].value
    this.user.cin = this.userForm.controls['cin'].value
    this.user.adresse = this.userForm.controls['adresse'].value
    this.user.country = this.userForm.controls['country'].value

    this.userServ.updateProfile(this.userId, this.user).subscribe((res: any) => {
      this.showeSuccess("profile updated !")
      this.router.navigate(['home']);
    })
  }
  updatePW() {
    this.userId = localStorage.getItem('idUser')
    this.pw.old_password = this.pwForm.controls['old_password'].value
    this.pw.new_password = this.pwForm.controls['new_password'].value

    if (this.pw.old_password != null && this.pw.new_password != null) {
      this.userServ.changePassword(this.userId, this.pw).subscribe((res: any) => {
        if (res.status = 201) {
          this.showeSuccess(res.message)
          this.router.navigate(['home']);
        } else {
          this.showerror("res.error")
        }
      })
    } else {
      this.showerror('Oops, you didnt provide any values')
    }
  }

  showeSuccess(message) {
    this.toastr.success(this.translateF(message), 'Success!', {
      timeOut: 7000,
    });
  }
  getUser() {
    this.userId = localStorage.getItem('idUser')
    this.userServ.getProfile(this.userId).subscribe((res: any) => {
      this.hasUploaded = res.data.has_uploaded_id
      this.checked = res.data.checked
      this.userForm.controls['username'].setValue(res.data['username']);
      this.userForm.controls['firstname'].setValue(res.data['firstname']);
      this.userForm.controls['lastname'].setValue(res.data['lastname']);
      this.userForm.controls['email'].setValue(res.data['email']);
      this.userForm.controls['cin'].setValue(res.data['cin']);
      this.userForm.controls['tel'].setValue(res.data['phone']);
      this.userForm.controls['country'].setValue(res.data['country']);
      this.userForm.controls['adresse'].setValue(res.data['adresse']);
    })
  }

  translateF(txt: string): string {
    return this.translateService.instant(txt);
  }
  showerror(message) {
    this.toastr.error(this.translate(message), 'Error');
  }
  modal: NgbModalRef
  errorUpdate() {
    this.showerror('Your account is not approved yet, sorry you cant edit your profile.')
    this.modal = this.modalService.open(FileModalComponent, { backdrop: "static" });
  }
  private translate(txt: string): string {
    return this.translateService.instant(txt);
  }

  openModal() {
    const modalRef = this.modalService.open(FileModalComponent, { size: 'xxl', centered: true });

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
}
