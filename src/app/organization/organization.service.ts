import {HttpClient} from '@angular/common/http';
import {Organization} from './organization';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  private AddOrganizationURL = 'http://localhost:8080/Users/AddOrganization';
  private GetOrganizationURL = 'http://localhost:8080/Users/GetOrganization/';
  private GetAllOrganizationsURL = 'http://localhost:8080/Users/GetAllOrganizations';

  constructor(private http: HttpClient) {
  }
  addOrganization(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>(this.AddOrganizationURL, organization);
  }

  getOrganization(organizationName: string): Observable<Organization> {
    return this.http.get<Organization>(this.GetOrganizationURL + organizationName);
  }

  getAllOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.GetAllOrganizationsURL);
  }
}
