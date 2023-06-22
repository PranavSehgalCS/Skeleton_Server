/*///////////////////////////////////////////////////////////////////////////////////////////////////////
*   FILE  : view-template.component.ts
*   AUTHOR : Pranav Sehgal
*            +Auto-generated on :
*                    ng generate component view-template 
*
*   DESCRIPTION : USED as the typescript file for Viewing Templates
*                 USES Template model to encapsulate data
*                 USES TemplateService service to communicate with backend 
*                 TO CREATE new component, use ng generate component <component name>
///////////////////////////////////////////////////////////////////////////////////////////////////////*/

import { Component } from '@angular/core';
import { Template} from 'src/app/model/Template';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
///////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-view-template',
  templateUrl: './view-template.component.html',
  styleUrls: ['../template-styles.css']
})
///////////////////////////////////////////////////////////////////////////////////////////////////////*/
export class ViewTemplateComponent {
  constructor(public tempService:TemplateService,
              private router:Router){
  }
  
  public retVal:string="";
  public line:boolean = true;
  public refresh:boolean =true;
  public templateMap:Map<number,Template> = new Map<number,Template>();
  
  mapToArr():Template[]{
    return Array.from(this.templateMap.values());
  }

  ngOnInit(){
    this.tempService.getTemplates(-1).subscribe(res => {
      for(let temp of res){
        this.templateMap.set(temp.temid,temp)
      }
    });
  }

  public getLine():string{
    this.line = !this.line;
    if(this.line){
      return "info-line";
    }
    return "info-line2";
  }
  public getBox():string{
    if(this.line){
      return "info-box box-comp";
    }else{
      return "info-box box-comp2"
    }
  }

  async delButton(temid:number){
    if(confirm("Are You Sure You Want To Delete This?")){
      var retVal:boolean = false;
      await this.tempService.deleteTemplate(temid).subscribe(res => { retVal = res; });
      await this.tempService.delay(100);
      this.templateMap.delete(temid);
      this.refresh = true;
    }
  }
  async ediButton(temidParam:number){
    this.router.navigate(['/templates/edit'],{queryParams:{temid:temidParam}});
  }
  async vieButton(temidParam:number){
    this.router.navigate(['/templates/viewtemplate'],{queryParams:{temid:temidParam}});
  }
  
}
