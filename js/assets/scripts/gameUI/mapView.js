// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_tagSp:cc.Node,
        m_arrowSp:cc.Node,
        m_mapContent:cc.Node,
        m_scrollView:cc.ScrollView
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_mapContent.zIndex=1000
    },

    hide(){
        this.node.active=false
    },

    show(){
        if(this.node.active)
            return this.node.active=false

        this.node.active=true
        for(let i=this.m_mapContent.childrenCount-1;i>=0;i--){
            let children=this.m_mapContent.children[i]
            children.destroy()
        }

        let curLevel=window.m_gkLevel
        let percent=curLevel*1.0/window.g_GlobalData.checkPointNodePos.length
        this.m_scrollView.scrollToPercentHorizontal(percent,0.1)

        for(let i=0;i<window.g_GlobalData.checkPointNodePos.length&&i<curLevel-1;i++){
            let _x=window.g_GlobalData.checkPointNodePos[i].x
            let _y=window.g_GlobalData.checkPointNodePos[i].y
            let tag=cc.instantiate(this.m_tagSp)
            tag.active=true
            tag.parent=this.m_mapContent
            tag.x=_x
            tag.y=_y
        }

        let _x=window.g_GlobalData.checkPointNodePos[curLevel-1].x
        let _y=window.g_GlobalData.checkPointNodePos[curLevel-1].y
        let arrowSp=cc.instantiate(this.m_arrowSp)
        arrowSp.x=_x
        arrowSp.y=_y
        arrowSp.active=true
        arrowSp.parent=this.m_mapContent

        let moveBy=cc.moveBy(0.5,cc.v2(0,50))
        let moveBy2=cc.moveBy(0.5,cc.v2(0,-50))
        let seq=cc.sequence(moveBy,moveBy2)
        let action=cc.repeatForever(seq)

        cc.tween(arrowSp).then(action).start()
    },

    start () {

    },

    // update (dt) {},
});
