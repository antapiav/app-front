import { FormGroup } from '@angular/forms';

export class AppUtils {

    public static convertDateToString(date: any): string {
        var newDate = new Date(date);
        var stringDate = newDate.getUTCDate()+"/"+(newDate.getUTCMonth()+1)+"/"+newDate.getFullYear()
            +" - "+newDate.getHours()+"H:"+(newDate.getMinutes()+1)+"m:"+newDate.getSeconds()+"s.";
        return stringDate;
    }

    public static validSession(): boolean {
        var usuario = AppUtils.getSessionStorage();
        return (usuario) ? true : false;
    }

    public static logOutSession(): any {
        sessionStorage.removeItem('session');
    }

    public static setSessionStorage(objSession: any): void {
        sessionStorage.setItem('session', JSON.stringify(objSession));
    }

    public static getSessionStorage(): any {
        return JSON.parse(sessionStorage.getItem('session'));
    }

    public static validPassword(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
    
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }
    
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}