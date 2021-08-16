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
    hit(hp,target) {
        let js=target.getComponent("monsterItem");
        js.hit(hp)
    },
    setAtk(atk){
        this.m_atk=atk
    },
    getAtk(){
        return this.m_atk
    }
});
