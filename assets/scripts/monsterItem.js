// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_monsterNode:cc.Node,
        m_monsterSp:[cc.Sprite],
        m_monsterAtlasArr:[cc.SpriteAtlas]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_curPathIndex=0;
    },

    init(pathList,type,index){
        this.m_curPathIndex=0;
        
        let monster=this.node;
        let startPos=pathList[0];
        let spriteFrame=this.m_monsterAtlasArr[type].getSpriteFrame(index);
        this.m_monsterSp[0].spriteFrame=spriteFrame;
        this.m_monsterSp[1].spriteFrame=spriteFrame;

        monster.x=startPos.x*106+106/2;
        monster.y=-startPos.y*106-106/2;

        this.go(pathList,type,index);
    },

    go(pathList){
        let monster=this.node;

        let _x=pathList[1].x*106;
        let _y = -pathList[1].y * 106 ;
        let moveTo1 = cc.tween().call(()=>{
            this.monsterDirection(pathList[this.m_curPathIndex],pathList[++this.m_curPathIndex]);
        }).to(0.5, { scale: 1.2,position: cc.v2(_x, _y) });
        let moveTo2 = cc.tween().to(0.5, { scale: 1.0,position: cc.v2(_x+106/2, _y- 106 / 2) })

        let moveTo=cc.tween()
        for(let i=2;i<pathList.length;i++){
            let _x=pathList[i].x*106+106/2;
            let _y=-pathList[i].y*106-106/2;
            moveTo=moveTo.call(()=>{
                this.monsterDirection(pathList[this.m_curPathIndex],pathList[++this.m_curPathIndex]);
            }).to(1,{position:cc.v2(_x,_y)});
        }
        moveTo=moveTo.call(()=>{window.m_gMonsterBuild.recycleMonster(monster);});

        cc.tween(monster).then(moveTo1).then(moveTo2).then(moveTo).start();

        let jumpTo=cc.tween().repeatForever(cc.tween().to(0.5,{scale:1.2}).to(0.5,{scale:1.0}));
        cc.tween(this.m_monsterNode).then(jumpTo).start();
    },

    monsterDirection(start,end){
        if(start.x>end.x){//左
            this.m_monsterSp[0].node.active=true;
            this.m_monsterSp[1].node.active=false;
        }
        else if(start.x<end.x){//右
            this.m_monsterSp[0].node.active=false;
            this.m_monsterSp[1].node.active=true;
        }
    },

    start () {

    },

    // update (dt) {},
});
