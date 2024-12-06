import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import Stepper from 'bs-stepper';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPassword = false;
  stepper: any;
  currentStep: any;
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  fileInfos: Observable<any>;
  terms
  notMatching: boolean;

  constructor(
    private authServ: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private readonly elementRef: ElementRef,
    private toastrService: ToastrService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    const stepperEl = this.elementRef.nativeElement.querySelector('#stepper1');
    this.fileInfos = this.authServ.getFiles();
    stepperEl.addEventListener('show.bs-stepper', event => {
      this.currentStep = event.detail.to;
    });

    this.stepper = new Stepper(stepperEl, {
      linear: false,
      animation: true
    });

    const nonWhitespaceRegExp: RegExp = new RegExp("^([A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*)$");

    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(nonWhitespaceRegExp)]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.min(8)]),
      country: new FormControl('', [Validators.required]),
      cin: new FormControl('', [Validators.required, Validators.min(8)]),
      confirmPassword: new FormControl('', [Validators.required,]),
      terms: new FormControl('', [Validators.required,])

    }
    );
  }



  checkPasswords() {
    let pass = this.registerForm.controls.password.value;
    let confirmPass = this.registerForm.controls.confirmPassword.value;

    if (pass !== confirmPass) {
      this.notMatching = true;
    } else {
      this.notMatching = false;

    }
  }






  onShowPassword() {
    this.showPassword = !this.showPassword;
  }
  close() {
    this.modalService.dismissAll()
  }
  private translate(txt: string): string {
    return this.translateService.instant(txt);
  }

  register() {
    this.checkPasswords();
    if (this.notMatching) {
      this.toastrService.error(this.translate('Confirm your password'), 'Error');
    } else {
      this.authServ.signup(
        this.registerForm.controls['username'].value,
        this.registerForm.controls['firstname'].value,
        this.registerForm.controls['lastname'].value,
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value,
        this.registerForm.controls['phone'].value,
        this.registerForm.controls['country'].value,
        this.registerForm.controls['cin'].value,
        this.registerForm.controls['terms'].value)
      this.close()
      // this.router.navigate(['home'])


    }
  }
  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.authServ.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.authServ.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }
}
