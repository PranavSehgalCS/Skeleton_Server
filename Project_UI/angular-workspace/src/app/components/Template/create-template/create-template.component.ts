/*///////////////////////////////////////////////////////////////////////////////////////////////////////
*   FILE  : create-template.component.ts
*   AUTHOR : Pranav Sehgal
*            +Auto-generated on :
*                    ng generate component create-template 
*   DESCRIPTION : USED as the typescript file for Creating Templates
*                 USES Template model to encapsulate data
*                 USES TemplateService service to communicate with backend 
*                 TO CREATE new component, use ng generate component <component name>
////////////////////////////////////////////////////////////////////////////////////////////////////////*/

import { Component } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['../template-styles.css']
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////
export class CreateTemplateComponent {
  constructor(public tempService:TemplateService){}

  async createForm(tname:string, tmess:string, tbool:boolean){
    if(tname.length == 0){
      this.tempService.changeErr("Enter A Name");
    }else if(tmess.length == 0){
      this.tempService.changeErr("Enter A Message");
    }else{
      var retVal:boolean =false;
      await this.tempService.createTemplate(tname,tmess,tbool).subscribe(res => { retVal=res; });
      await this.tempService.delay(300);
      if(retVal){
        alert("Template Created Successfully!!");
        await location.reload();
      }else{
        alert("Error While Creating New Template");
      }
    }
  }
  
}
