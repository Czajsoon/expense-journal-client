import {FormArray, FormGroup} from "@angular/forms";

export function ExpenseValidator(controlName:string,controlName1:string , matchingControlName: string) {

  return(fromGroup: FormGroup)=>{
    const control = fromGroup.controls[controlName];
    const controlSecound = fromGroup.controls[controlName1];
    const matchingControl = fromGroup.controls[matchingControlName] as FormArray;

    if(control.errors && controlSecound.errors && !control.errors['expenseValidator']){
      return
    }
    if((control.value === "" || controlSecound.value === ""
     || control.value === null || controlSecound.value === null) && matchingControl.length === 0){
      control.setErrors({expenseValidator:true})
      controlSecound.setErrors({expenseValidator:true})
    }
    else{
      control.setErrors(null);
      controlSecound.setErrors(null);
    }
  }
}
