// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_bullet:[cc.Node],
        m_effect:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    init (dis) {
        this.isDie=false

        let bullet=this.node
        let target=bullet.m_target

        let arr=[80,130,230]
        for(let i=0;i<arr.length;i++){
            if(dis>arr[i]){
                this.m_bullet[i].active=false
            }else{
                let d=dis/arr[i]
                this.m_bullet[i].width*=d
                this.m_bullet[i].height*=d
                this.m_bullet[i].active=true
                this.m_effect=this.createBulletEffect(target)
                let animation=this.m_effect.getComponent(cc.Animation)
                this.m_effect.active=true
                animation.play("effect")
                cc.tween(bullet)//帧事件回调有问题，改为缓动动画
                    .delay(0.5)
                    .call(()=>{
                        this.isDie=true
                        this.m_effect.removeFromParent()
                        bullet.removeFromParent()
                    })
                    .start()
                }
        }
    },

    createBulletEffect(target){
        let effect=cc.instantiate(this.m_effect)
        let worldPos=target.convertToWorldSpaceAR(cc.v2(0,0))
        let nodePos=window.m_gBulletBuild.node.convertToNodeSpaceAR(worldPos)
        effect.setPosition(nodePos)
        effect.active=true
        effect.parent=window.m_gBulletBuild.node
        return effect
    },

    update (dt) {
        let bullet=this.node
        let target=bullet.m_target
        if(!target||this.isDie)return

        let targetPos=window.m_gBulletBuild.node.convertToNodeSpaceAR(target.convertToWorldSpaceAR(cc.v2(0,0)))
        
        //转向角度
        var angle = window.getAngle(bullet.getPosition(),targetPos);
        bullet.angle=angle-90
    },
});
