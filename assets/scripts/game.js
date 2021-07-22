// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    clickEvent(target,data){
        if("怪物出动"==data){
            let pathList=window.m_gMapDataManager.getPathData();
            let type=window.random(0,2);
            let index=window.random(0,10);
            window.m_gMonsterBuild.buildMonster(pathList,type,index);
        }
    },

    start () {

    },

    // update (dt) {},
});
