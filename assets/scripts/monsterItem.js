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
        m_hpProgressBar:cc.ProgressBar,
        m_hpNode:cc.Node,
        m_monsterAtlasArr:[cc.SpriteAtlas]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_curPathIndex=0;
    },

    updateHpProgressBar(){
        let precent=this.m_curHp/this.m_maxHp
        this.m_hpProgressBar.progress=precent
    },

    hit(hp){
        let monster=this.node
        if(Math.abs(hp)>this.m_curHp)
            hp=this.m_curHp

        window.m_gBulletEffect.createLabel(monster.getPosition(),hp)
        
        this.m_curHp-=hp
        this.updateHpProgressBar()
        
        if(this.m_curHp<=0){
            this.m_curHp=0
            this.m_maxHp=0
            
            this.setState(-1)
            monster.stopAllActions()
            window.m_gBulletEffect.createEffect(monster.getPosition())
            window.m_gMonsterBuild.recycleMonster(monster)
        }
        
    },

    init(pathList,type,index,hp,speed){
        this.m_state=0;
        this.m_curPathIndex=0;
        this.m_curHp=hp
        this.m_maxHp=hp
        
        let monster=this.node;
        let startPos=pathList[0];
        let spriteFrame=this.m_monsterAtlasArr[type].getSpriteFrame(index);
        this.m_monsterSp[0].spriteFrame=spriteFrame;
        this.m_monsterSp[1].spriteFrame=spriteFrame;
        let width=this.m_monsterSp[0].node.width
        let height=this.m_monsterSp[0].node.height
        monster.x=startPos.x*106+106/2;
        monster.y=-startPos.y*106-106/2;

        this.go(pathList,speed);

        let js=this.m_monsterNode.getComponent("collider_3")
        js.updateBoxCollider(width,height)
        
        this.m_hpProgressBar.node.y=width
        this.m_hpProgressBar.totalLength=width
        this.m_hpNode.width=width
    },

    setState(_state){
        this.m_state=_state;
    },
    isDie(){
        return this.m_state==-1;
    },

    go(pathList,speed){
        let monster=this.node;
        let time=1-0.5*speed

        let _x=pathList[1].x*106;
        let _y = -pathList[1].y * 106 ;
        let moveTo1 = cc.tween().call(()=>{
            this.monsterDirection(pathList[this.m_curPathIndex],pathList[++this.m_curPathIndex]);
        }).to(time, { scale: 1.2,position: cc.v2(_x, _y) });
        let moveTo2 = cc.tween().to(time, { scale: 1.0,position: cc.v2(_x+106/2, _y- 106 / 2) })

        let moveTo=cc.tween()
        for(let i=2;i<pathList.length;i++){
            let _x=pathList[i].x*106+106/2;
            let _y=-pathList[i].y*106-106/2;
            moveTo=moveTo.call(()=>{
                this.monsterDirection(pathList[this.m_curPathIndex],pathList[++this.m_curPathIndex]);
            }).to(1,{position:cc.v2(_x,_y)});
        }
        moveTo=moveTo.call(()=>{
            this.setState(-1);
            window.m_gMonsterBuild.recycleMonster(monster);
        });

        cc.tween(monster).then(moveTo1).then(moveTo2).then(moveTo).start();

        let jumpTo=cc.tween().repeatForever(cc.tween().to(time,{scale:1.2}).to(time,{scale:1.0}));
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
