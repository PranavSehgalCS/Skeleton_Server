///////////////////////////////////////////////////////////////////////////////////////////////////////
//  FILE : Templates.ts
//  AUTHOR : Pranav Sehgal
//           +Auto-generated on ng generate service 
//  DESCRIPTION: Is a template ts service with constructor to encapsulate data 
//               USE this as a template to create your own ts service that can communicate with backend
//               TO CREATE new service, use : ng generate service <service name>
///////////////////////////////////////////////////////////////////////////////////////////////////////
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Template } from '../model/Template';
import { HttpClient, HttpParams } from '@angular/common/http';
///////////////////////////////////////////////////////////////////////////////////////////////////////

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  public errString:string = "";
  private templateUrl:string = 'http://localhost:8080/template';;

  constructor(private http: HttpClient) { }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
  getTemplates(temid:number): Observable<Template[]>{
    if(temid!=-1){
      var getVal:Template = new Template(0,"","",false);
      return this.http.get<Template[]>(this.templateUrl+"/"+String(temid));
    }
    return this.http.get<Template[]>(this.templateUrl);
  }

  createTemplate(tname:string, tmess:string, tbool:boolean): Observable<boolean>{
    const param = new HttpParams().append("tname", tname)
                                  .append("tmess", tmess)
                                  .append("tbool", tbool)
    return this.http.post<boolean>(this. templateUrl,null,{params:param});
  }

  updateTemplate(temp:Template): Observable<boolean>{
    const param = new HttpParams().append("temid", temp.temid)
                                  .append("tname", temp.tname)
                                  .append("tmess", temp.tmess)
                                  .append("tbool", String(temp.tbool));
    return this.http.put<boolean>(this.templateUrl,null,{params:param});
  }

  deleteTemplate(temid:number): Observable<boolean>{
    const param = new HttpParams().append("temid", temid)
    return this.http.delete<boolean>(this.templateUrl,{params:param});
  }

  changeErr(err:string):void{
    this.errString = err;
  }
    
}
