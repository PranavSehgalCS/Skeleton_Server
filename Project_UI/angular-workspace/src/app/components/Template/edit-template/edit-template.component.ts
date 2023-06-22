/*///////////////////////////////////////////////////////////////////////////////////////////////////////
*   FILE  : edit-template.component.ts
*   AUTHOR : Pranav Sehgal
*            +Auto-generated on :
*                    ng generate component edit-template 
*
*   DESCRIPTION : USED as the typescript file for Creating Templates
*                 USES Template model to encapsulate data
*                 USES TemplateService service to communicate with backend 
*                 TO CREATE new component, use ng generate component <component name>
////////////////////////////////////////////////////////////////////////////////////////////////////////*/
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Template } from 'src/app/model/Template';
import { TemplateService } from 'src/app/services/template.service';
//////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['../template-styles.css']
})
export class EditTemplateComponent {
  public errStat:boolean = false;
  public headerMessage:string = ".";
  private pageInitialized:boolean = false;
  public curTemp:Template = new Template(0,"","",false);

  constructor(private tempService:TemplateService,
              private route:ActivatedRoute){}

  async ngOnInit(){
    var retVal:boolean = false;
    this.curTemp.temid = Number(this.route.snapshot.queryParamMap.get('temid'));
    if(this.curTemp.temid>0){
      this.tempService.getTemplates(this.curTemp.temid).subscribe( res =>{
        var temp = res.pop()
        if(temp!=undefined){
          retVal = true;
          this.curTemp.tname = temp.tname;
          this.curTemp.tmess = temp.tmess;
          this.curTemp.tbool = temp.tbool;
          this.pageInitialized = true;
          this.headerMessage = "Editing Template of ID : " + this.curTemp.temid;
        }
      });
    }else{
      this.errStat = true;
      alert("Invalid Temid Provided");
    }
    await this.tempService.delay(4000);
    if(!retVal && !this.errStat){
      this.errStat = true;
      this.headerMessage = "An ERROR occured" 
      alert("An ERROR occured while getting Data!")
    }
  }

  async updateTemplate(tname:string,tmess:string, tbool:boolean){
    if(!this.pageInitialized){
      alert("Page Not Initialized");
    }else if(this.errStat){
      alert("Can't update on an error page");
    }else if(tname.length==0){
      this.headerMessage = "Please enter a name";
    }else if(tmess.length == 0){
      this.headerMessage = "Please enter a message";
    }else{
      var retVal:boolean = false;
      this.curTemp.tname = tname;
      this.curTemp.tmess = tmess;
      this.curTemp.tbool = tbool; 
      await this.tempService.updateTemplate(this.curTemp).subscribe(res => {
        retVal = res;
        if(retVal == true){
          alert("Template updated successfully");
        }
      });
      await this.tempService.delay(3000);
      if(!retVal){
        await alert("ERROR while updating template!");
      }
    }
    

  }

}
