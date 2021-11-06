import { UIConf } from "../base/ui/UIManager";

export  enum    UIID{
    UIView,
    UIGameView,
    UITest
}

export  let UIConfig:{[key:number]:UIConf}={
    [UIID.UIView]:{prefab:"prefab/view"},
    [UIID.UIGameView]:{prefab:"prefab/ui/gameView"},
    [UIID.UITest]:{prefab:"prefab/ui/test"}
}