import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user/user';
import {Certificate} from './certificate';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class CertificateService {


  private AddCertificateURL = 'http://localhost:8080/Certificates/UploadCertificate/' + this.authenticationService.getUserID();
  private GetCertificateByIdURL = 'http://localhost:8080/Certificates/GetCertificate/';
  private GetAllCertificates = 'http://localhost:8080/Certificates/GetAllCertificates';
  private GetAllCertificatesByUserIdURL = 'http://localhost:8080/Certificates/GetAllCertificates/' + this.authenticationService.getUserID();
  private deleteCertificateURL = 'http://localhost:8080/Certificates/DeleteCertificate/';
  private updateCertificateURL = 'http://localhost:8080/Certificates/UpdateCertificate/';
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private authenticationService: AuthenticationService) {}

  uploadCertificate(formdata: any): Observable<Certificate> {
    return this.http.post<Certificate>(this.AddCertificateURL, formdata);
  }


  getAllCertificatesByUserID(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.GetAllCertificatesByUserIdURL);
  }

  deleteCertificate(certificateId: number){
    return this.http.delete(this.deleteCertificateURL + certificateId);
  }
  updateCertificate(certificate: Certificate, certificateId: number): Observable<Certificate> {
    return this.http.put<Certificate>(this.updateCertificateURL + certificateId, certificate);
  }

}
