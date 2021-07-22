// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_blockAtlas:cc.SpriteAtlas
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initMap();
    },

    initMap(){
        let blockData=window.m_gMapDataManager.getBlockData();
        for(let i=0;i<blockData.length;i++){
            for(let j=0;j<blockData[i].length;j++){
                let node=new cc.Node();
                node.parent=this.node;
                node.x=j*106+106/2;
                node.y=-i*106-106/2;

                let sp=node.addComponent(cc.Sprite);
                let spriteFrame=this.m_blockAtlas.getSpriteFrame(blockData[i][j]);
                sp.spriteFrame=spriteFrame;
            }
        }
    },

    start () {

    },

    // update (dt) {},
});