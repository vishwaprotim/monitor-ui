import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentapiService {

  private baseUrl:String ="http://localhost:8080/api"
  constructor(private http:HttpClient) { }

  postStudent(data:any){
    
    let payload={
      firstName: data.fName,
      middleName: data.mName,
      lastName: data.lName,
      marks: data.marks,
      dob: this.convertDateToString(data.dob),
      addressLine1: data.addrLine1,
      addressLine2: data.addrLine2
    }

    return this.http.post(`${this.baseUrl}/student`, payload, {observe: 'response'});
  }

  getAllStudents(){
    return this.http.get(`${this.baseUrl}/student`,{observe: 'response', responseType: 'json'});
  }


  convertDateToString(date:Date){
    let mm:number = (date.getMonth() + 1) // Month from 0 to 11
    let dd:number = date.getDay();
    let yyyy:number = date.getFullYear();
    return '' + yyyy + '-' + (mm<=9 ? '0' + mm : mm) + '-' + (dd <= 9 ? '0' + dd : dd);
  }
}
