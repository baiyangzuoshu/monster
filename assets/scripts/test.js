// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       m_lab:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    buildMonster(){
        window.m_gMonsterBuild.build();
    },

    clearCannon(){
        window.m_gCannonBuild.clearAllCannon();
    },

    clickLab(pos,str){
        let labNode=cc.instantiate(this.m_lab)
        let lab=labNode.getComponent(cc.Label)
        lab.string="15.0k"
        labNode.parent=this.node

        let array=[]
        array.push(cc.v2(50,50))
        array.push(cc.v2(-25,50))
        array.push(cc.v2(-50,0))
        var action1 = cc.cardinalSplineBy(0.5, array, 0)
        let action2=cc.callFunc(()=>{labNode.removeFromParent()})
        cc.tween(labNode).then(action1).then(action2).start()
    },

    addGold(){
        window.g_LocalData.addGold(100)
    },

    addCoin(){
        window.g_LocalData.addCoin(1000)
    },

    startGame(){
        window.m_startGame=true
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
