import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentapiService } from 'src/app/service/studentapi.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  implements OnInit{
  
  title:string = "Registration Form";
  submitted:boolean = false;
  studentForm!: FormGroup;

  minDate!: Date;
  maxDate!: Date;

  private namePattern:string = "^[a-zA-Z ]*$";
  private marksPattern:string = "^(?=.)(([0-9]*)(\.([0-9]+))?)$";

  constructor(
    private studentService: StudentapiService,
    private fb: FormBuilder,
    private snack: MatSnackBar){
    // Date Picker - Restrict dates to min and max values allowed.
    // Set the min to Jan 1st 80 years in the past and max to Dec 31st 5 year in the past.
    // Note that in JS months are numbered from 0 to 11.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 80, 0, 1);
    this.maxDate = new Date(currentYear - 5, 11, 31);
  }


  ngOnInit() {
    this.studentForm = this.fb.group({
      fName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(this.namePattern)]),
      mName: new FormControl(null, [Validators.pattern(this.namePattern)]),
      lName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(this.namePattern)]),
      dob: new FormControl(null, [Validators.required]),
      marks: new FormControl(null, [Validators.required, Validators.pattern(this.marksPattern)]),
      addrLine1: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      addrLine2: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  // Handle submit logic
  submitForm() {
    if(this.studentForm.valid){
      this.submitted = true;
      this.studentService.postStudent(this.studentForm.value).subscribe({
        next: response=>{
          if(response.status == 201) {
            this.resetForm(this.studentForm);
            this.snack.open("Student registered successfully!", "Close", {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 2000
            });
            this.submitted=false;
          }
        },
        error: error=>{
          this.snack.open("Uh-oh! Something went wrong! Error Code: " + error.status, "Close", {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 2000
          });
          this.submitted=false;
        }
      });
    }
  }

  // Error handler : Checks if form field(control) has errors
  public errorHandler(control:string) {
    return this.studentForm.controls[control].invalid;
  }

  // Error Handler : Shows error mesages
  errorMessage(control:string){
    if(this.studentForm.controls[control].hasError('required')){
      return "This is mandatory!";
    }

    if(this.studentForm.controls[control].hasError('minlength')){
      // Check if the error is to be raised for Name field or Address
      return control.endsWith('ame')? "Must contain more than 2 characters!" : "Must contain more than 3 characters";
    }

    if(this.studentForm.controls[control].hasError('pattern')){
      // Check if the error is to be raised for Name field or Marks
      return control.endsWith('ame')? "Invalid Name!" : "Invalid Marks!";
    }
    // Default error
    return "Correct this field!";
  }

  // Resets the form
  resetForm(form: FormGroup){
    form.controls['fName'].setValue(null);
    form.controls['fName'].setErrors(null);
    form.controls['mName'].setValue(null);
    form.controls['mName'].setErrors(null);
    form.controls['lName'].setValue(null);
    form.controls['lName'].setErrors(null);
    form.controls['dob'].setValue(null);
    form.controls['dob'].setErrors(null);
    form.controls['marks'].setValue(null);
    form.controls['marks'].setErrors(null);
    form.controls['addrLine1'].setValue(null);
    form.controls['addrLine1'].setErrors(null);
    form.controls['addrLine2'].setValue(null);
    form.controls['addrLine2'].setErrors(null);
    form.markAsPristine();
    form.markAsUntouched();
  }


}

