import { UIConf } from "../base/ui/UIManager";

export  enum    UIID{
    UIView
}

export  let UIConfig:{[key:number]:UIConf}={
    [UIID.UIView]:{prefab:"prefab/view"}
}