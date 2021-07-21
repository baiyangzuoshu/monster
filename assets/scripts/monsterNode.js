// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_monsterItem:cc.Prefab,
        m_monsterAtlasArr:[cc.SpriteAtlas]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.m_gMonsterBuild=this;
    },

    buildMonster(pathArr,type,index){
        let startPos=pathArr[0];
        let spriteFrame=this.m_monsterAtlasArr[type].getSpriteFrame(index);

        let monster=cc.instantiate(this.m_monsterItem);
        monster.parent=this.node
        monster.x=startPos.x*106+106/2;
        monster.y=-startPos.y*106-106/2;
        
        let js=monster.getComponent("monsterItem");
        js.setMonsterSpriteFrame(spriteFrame);

        let moveTo=cc.tween()
        for(let i=1;i<pathArr.length;i++){
            let _x=pathArr[i].x*106+106/2;
            let _y=-pathArr[i].y*106-106/2;
            moveTo=moveTo.to(1,{position:cc.v2(_x,_y)});
        }
        cc.tween(monster).then(moveTo).start();
    },

    start () {

    },

    //update (dt) {},
});
