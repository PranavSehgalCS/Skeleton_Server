import { Component } from '@angular/core';
import { Template } from 'src/app/model/Template';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-viewtemplate',
  templateUrl: './viewtemplate.component.html',
  styleUrls: ['../template-styles.css']
})
export class ViewtemplateComponent {

  public headerMessage = ".";
  private errStat:boolean = false;
  private pageInitialized:boolean = false;
  public curTemp:Template = new Template(0,"","",false);

  public constructor( private router:Router,
                      private route:ActivatedRoute,
                      private tempService:TemplateService){}

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
          this.headerMessage = "Viewing Template of ID : " + this.curTemp.temid;
          this.pageInitialized = true;
        }
      });
    }else{
      this.errStat = true;
      alert("Invalid Temid Provided");
    }
    await this.tempService.delay(4000);
    if(!retVal&& !this.errStat){
      this.errStat = true;
      this.headerMessage = "An ERROR occured" 
      alert("An ERROR occured while getting Data!")
    }
  }

  


}
