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

    onLoad () {

    },

    onCollisionEnter: function (other, self) {
        //console.log("onCollisionEnter monster")
    },

    updateBoxCollider(w,h){
        let boxCollider=this.node.getComponent(cc.BoxCollider)
        boxCollider.size.width=w*1/3
        boxCollider.size.height=h*1/3
        boxCollider.offset.y=h/2
    },

    start () {

    },

    // update (dt) {},
});
