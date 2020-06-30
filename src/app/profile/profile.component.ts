import {Component, OnInit} from '@angular/core';
import {User} from '../user/user';
import {UserService} from '../user/user.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {Certificate} from '../certificate/certificate';
import {CertificateService} from '../certificate/certificate.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  show = false;
  certificate: Certificate[];
  a: number;
  closeResult = '';

  isChecked = false;
  uploadForm = this.formBuilder.group({
    certificateDescription: ['', Validators.required],
    Data: ['', Validators.required]
  });

  shareForm = new FormGroup({
    certificate: new FormArray([
    ])
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private certificateService: CertificateService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) {


  }

  buildshareList() {
    const arr = this.certificate.map(share => {
      return this.formBuilder.control(share.certificateId);
    });
    return this.formBuilder.array(arr);
  }

  open(content) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.certificateList();
  }

  getUserProfile() {
    this.userService.getUserByID(this.authenticationService.getUserID()).subscribe(
      result => {
        this.user = result;
      }
    );

  }

  certificateList() {
    this.certificateService.getAllCertificatesByUserID().subscribe(
      result => {
        this.certificate = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  update() {
    console.log(' :) ');
  }

  shareCertificate(value): void {

    console.log(value);
  }

  checkuncheckall() {
    // tslint:disable-next-line:triple-equals
    if (this.isChecked == true) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }

  }

  delete(certificateID) {
    console.log(certificateID);
    if (confirm('Are you sure you want to delete this certificate?')) {
      this.certificateService.deleteCertificate(certificateID);
      this.certificateService.deleteCertificate(certificateID).subscribe(
        result => {
          location.reload();
        },
        error => {
          alert('An error has eccurred');
        }
      );
    }
  }

  toggle() {
    this.show = !this.show;
  }
}
