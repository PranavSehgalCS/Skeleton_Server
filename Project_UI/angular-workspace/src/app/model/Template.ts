///////////////////////////////////////////////////////////////////////////////////////////////////////
//  FILE : Templates.ts
//  AUTHOR : Pranav Sehgal <PranavSehgalCS>
//
//  DESCRIPTION: Is a template ts model with constructor to encapsulate data 
//               USE this as a template to create your own ts data model 
///////////////////////////////////////////////////////////////////////////////////////////////////////
export function getString(model:Template){
    var retVal:string = "( temid:"+ model.temid;
    retVal = retVal + "  , tname:"+ model.tname;
    retVal = retVal + "  , tmess:"+ model.tmess;
    retVal = retVal + "  , tbool:"+ model.tbool + " )";
    return retVal;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
export class Template{
    public temid:number = 0;
    public tname:string = "";
    public tmess:string = "";
    public tbool:boolean = false;

    public constructor(temid:number, tname:string ,tmess:string, tbool:boolean) {
        this.temid = temid;
        this.tmess = tname;
        this.tmess = tmess;
        this.tbool = tbool;
    }
}

