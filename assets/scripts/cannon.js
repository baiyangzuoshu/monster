// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_gunNode:cc.Node,
        m_padNode:cc.Node,
        m_gunAtlas:cc.SpriteAtlas,
        m_padAtlas:cc.SpriteAtlas,
        m_levelLab:cc.Label,
        m_hit:cc.Node,
        m_range:cc.Node,
        m_gunPrefab:[cc.Prefab]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
    },

    initCannon(level){
        this.m_curLevel=level;
        this.m_target=null;
        this.m_gunSprite=null
        this.setGunAngle(window.random(0,360));
        this.updateGunAndPadShow();
        this.hideHit();
        this.hideRange();
    },

    resetCannon(){
        this.m_target=null;
        this.m_gunSprite=null
        this.setCurLevel(0);
        this.setGunAngle(window.random(0,360));
        this.updateGunAndPadShow();
        this.hideHit();
        this.hideRange();
    },
    setGunAngle(angle){
        this.m_gunNode.angle=angle;
    },
    getGunAngle(){
        return this.m_gunNode.angle;
    },

    levelUp(){
        this.m_curLevel++;
        this.updateGunAndPadShow();
    },

    getCurLevel(){
        return this.m_curLevel;
    },
    setCurLevel(level){
        this.m_curLevel=parseInt(level);
    },
    
    showHit(){
        this.m_hit.active=true;
    },
    hideHit(){
        this.m_hit.active=false;
    },
    showRange(){
        this.m_range.active=true;
    },
    hideRange(){
        this.m_range.active=false;
    },

    updateGunAndPadShow(){
        let data=window.g_GlobalData.cannonUpLevel
        let type=data[this.m_curLevel].type
        let level=data[this.m_curLevel].level

        if(this.m_gunSprite==null){
            if(this.m_gunPrefab[type]!=null){
                this.m_gunSprite=cc.instantiate(this.m_gunPrefab[type]);
            }
            else{
                this.m_gunSprite=new cc.Node();
                this.m_gunSprite.addComponent(cc.Sprite);
            }
            this.m_gunSprite.parent=this.m_gunNode;
        }

        this.m_levelLab.string=""+(level+1);
        let gunName=""+type+"_"+level;
        let gunSpriteFrame=this.m_gunAtlas.getSpriteFrame(gunName);
        let gunSprite=this.m_gunSprite.getComponent(cc.Sprite);
        gunSprite.spriteFrame=gunSpriteFrame;

        let padName=""+type+"_"+level;
        let padSpriteFrame=this.m_padAtlas.getSpriteFrame(padName);
        let padSprite=this.m_padNode.getComponent(cc.Sprite);
        padSprite.spriteFrame=padSpriteFrame;
    },

    depthCopyData(cur_js){
        cur_js.setCurLevel(this.getCurLevel());
        cur_js.updateGunAndPadShow();
    },

    isSynthetic(cur_js){
       return cur_js.getCurLevel()==this.getCurLevel();
    },

    setTarget(target){
        this.m_isFire=false;
        this.m_target=target;
    },

    beginFire(){
        if(this.m_gunSprite){
            let data=window.g_GlobalData.cannonUpLevel
            let type=data[this.m_curLevel].type
            let js=this.m_gunSprite.getComponent("gun_"+type);
            if(js)js.beginFire(this.m_target);
        }
    },
    endFire(){
        if(this.m_gunSprite){
            let data=window.g_GlobalData.cannonUpLevel
            let type=data[this.m_curLevel].type
            let js=this.m_gunSprite.getComponent("gun_"+type);
            if(js)js.endFire(this.m_target);
        }
    },

    update(dt){
        if(null==this.m_target){
            let target=m_gMonsterBuild.distanceCannonMinMonster(this.node);
            this.setTarget(target);
        }

        if(this.m_target){
            let js=this.m_target.getComponent("monsterItem");
            if(js.isDie()){
                return this.setTarget(null);
            }
            //距离判断
            let dis=Math.abs(window.getDistance(cc.v2(this.m_target.x,this.m_target.y),cc.v2(this.node.x,this.node.y)));
            if(dis<window.m_gCannonRange){
                let start=cc.v2(this.node.x,this.node.y);
                let end=cc.v2(this.m_target.x,this.m_target.y);
                let angle=window.getAngle(start,end)+360-90;
                if(this.m_isFire){
                    this.setGunAngle(angle);
                }
                else{
                    //炮台旋转动画
                    let moveAngle=300*dt;
                    if(this.getGunAngle()>angle//大于目标角度
                        ||angle-this.getGunAngle()>180){//反方向
                        moveAngle=-moveAngle;
                    }

                    this.setGunAngle(this.getGunAngle()+moveAngle);

                    if(this.getGunAngle()<0)this.setGunAngle(this.getGunAngle()+360);//?
                    
                    if(Math.abs(this.getGunAngle()-angle)<Math.abs(moveAngle)){
                        this.m_isFire=true;
                        this.setGunAngle(angle);
                        this.beginFire();
                    }
                }
            }
            else{
                this.setTarget(null);
            }
        }
    },
});
