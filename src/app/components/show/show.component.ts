import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentapiService } from 'src/app/service/studentapi.service';


export interface Student {
  id: number,
  firstName: string;
  mName: string;
  lName: string;
  dob: string;
  makrs: string;
  addrLine1: string;
  addrLine2: string;
}

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  title:String = "Registration Details for all Students";

  pages:number = 0;
  rows:number = 0;
  dataSource!:Student[];

  displayedColumns: string[] = ['id',
                                'firstName',
                                'middleName',
                                'lastName',
                                'dob',
                                'marks',
                                'addressLine1',
                                'addressLine2'];

  constructor(
    private studentService: StudentapiService,
    private fb: FormBuilder,
    private snack: MatSnackBar){
  }

  ngOnInit() {
    this.studentService.getAllStudents().subscribe({
      next: response=>{
        this.processData(response.body);
      },
      error: error=>{
        this.snack.open("Uh-oh! Something went wrong! Error Code: " + error.status, "Close", {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 2000
        });
      }
    })
  }

  processData(responseBody: any){
    this.pages = this.getPages(responseBody);
    this.rows = this.getRows(responseBody);
    this.populateStudentData(responseBody);

  }

  populateStudentData(responseBody:any){
    this.dataSource = <Student[]>responseBody._embedded.student;
  }

  getPages(responseBody:any){
    return responseBody.page.totalPages;
  }

  getRows(responseBody:any){
    return responseBody.page.size;
  }

}
