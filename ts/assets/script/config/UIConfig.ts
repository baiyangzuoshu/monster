import { UIConf } from "../base/ui/UIManager";

export  enum    UIID{
    UIView,
    UIGameView,
    UIMonster,
    UITest
}

export  let UIConfig:{[key:number]:UIConf}={
    [UIID.UIView]:{prefab:"prefab/view"},
    [UIID.UIGameView]:{prefab:"prefab/gameView"},
    [UIID.UIMonster]:{prefab:"prefab/monster"},
    [UIID.UITest]:{prefab:"prefab/test"}
}