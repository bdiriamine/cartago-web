import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-file-modal',
  templateUrl: './file-modal.component.html',
  styleUrls: ['./file-modal.component.css']
})
export class FileModalComponent implements OnInit {
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  fileInfos: Observable<any>;
  modalReference: any;

  constructor(private authServ: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private modalService: NgbModal,
    private readonly elementRef: ElementRef,
    private imageCompress: NgxImageCompressService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {


  }

  onSubmit() {
    return false;
  }

  images = []

  prog

  upload() {
    this.progressInfos = [];

    for (let idx = 0; idx < this.images.length; idx++) {
      this.imageCompress.compressFile(this.images[idx], 1, 1).then(
        result => {
          this.images[idx] = result;
        }
      );
    }
    if (this.images.length == 3) {


      this.authServ.upload(this.images).subscribe(
        event => {
          for (let idx = 0; idx < this.images.length; idx++) {

            this.progressInfos[idx] = { value: 0, fileName: "file : " + idx };




            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
              this.prog = this.progressInfos[idx].value
              this.message = 'files saved';

            } else if (event instanceof HttpResponse) {
              this.fileInfos = this.authServ.getFiles();
              // }
            }
          }
        },
        err => {
          this.message = 'Could not upload the files';
        }

      );

    } else {
      this.message = 'Could not upload the files';
    }


  }





  closeAll() {
    this.modalService.dismissAll()
  }
  closeActive() {
    this.activeModal.close();
  }





  private imageSrc: string = '';

  handleInputChange(e) {
    this.images = []
    this.progressInfos = [];
    this.selectedFiles = e.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {

      var file = this.selectedFiles[i]
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.images.push(reader.result)

  }

  transform(im) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(im);
  }
}
