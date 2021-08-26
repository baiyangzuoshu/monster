/*
zhengdekeyibianjima
*/

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
