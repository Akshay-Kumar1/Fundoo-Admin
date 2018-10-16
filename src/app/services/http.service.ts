import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  setUrl = 'http://34.213.106.173/api'
  adminLogin(url,body)
  
{
  url = this.setUrl+url;
  return this.http.post(url,body);
}

}
