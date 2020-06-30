import {Component, ElementRef, OnInit} from '@angular/core';
import {Certificate} from '../certificate/certificate';
import {CertificateService} from '../certificate/certificate.service';
import {Router} from '@angular/router';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {UserService} from '../user/user.service';
import {OrganizationService} from '../organization/organization.service';
import {Organization} from '../organization/organization';

@Component({
  selector: 'app-upload-certificate',
  templateUrl: './upload-certificate.component.html',
  styleUrls: ['./upload-certificate.component.css']
})
export class UploadCertificateComponent implements OnInit {

  constructor(
    private certificateService: CertificateService,
    private element: ElementRef,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private organizationService: OrganizationService,
  ) { }

  certificate: Certificate = {
    certificateId: 0,
    certificateName: null,
    certificateType: null,
    certificateDescription: null,
    certificateData: null,
    userId: null,
    organizationId: null,
    certificateStatues: null,
  };
  organization: Organization[];
  organizationID: number ;
  uploadForm = this.formBuilder.group({
    certificateDescription: ['', Validators.required],
    Data: ['', Validators.required],
    organizationSelect: ['', Validators.required]
  });


  ngOnInit(): void {
    this.getAllOrganizations();
  }
  get form() {
    return this.uploadForm.controls;
  }

  uploadFile() {
    const files = this.element.nativeElement.querySelector('#uploadFile').files;
    const formData = new FormData();
    this.uploadForm.value.certificateDescription = this.certificate.certificateDescription;
    this.uploadForm.value.certificateData = this.certificate.certificateData;
    this.uploadForm.value.organizationSelect = this.certificate.organizationId ;
   // const userId = this.authenticationService.getUserID();

    this.organizationService.getOrganization(this.form.organizationSelect.value).subscribe(
      res => {
        this.organizationID = res.organizationId;
      });

    console.log(this.certificate.certificateDescription);
    const file = files[0];
    formData.append('file', file, file.name);
    formData.append('description', this.certificate.certificateDescription);
    formData.append('date', this.certificate.certificateData);
    formData.append('organizationSelect', JSON.stringify(this.organizationID) );

    // formData.append('userId', JSON.stringify(userId));
    // console.log(this.authenticationService.getUserID());

    this.certificateService.uploadCertificate(formData).subscribe(
      result => {
        this.certificate.certificateId = result.certificateId;
      });
    this.certificateService.uploadCertificate(this.certificate).subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          result => {
            location.reload();
      }, error => {
        console.log(error);
      }
    );
  }

  getAllOrganizations() {
    this.organizationService.getAllOrganizations().subscribe(
      res => {
        this.organization = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}
