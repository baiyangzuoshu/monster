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

    start () {

    },

    update (dt) {
        let move=200*dt
        let bullet=this.node
        let target=bullet.m_target
        if(bullet.isDie)return

        let js=target.getComponent("monsterItem")
        let targetPos=window.m_gBulletBuild.node.convertToNodeSpaceAR(target.convertToWorldSpaceAR(cc.v2(0,0)))
        let target_rect=new cc.Rect(targetPos.x,targetPos.y,target.width,target.height)
        if(target_rect.contains(new cc.v2(bullet.x,bullet.y))||js.isDie()){
            let animation=bullet.getComponent(cc.Animation)
            animation.play("effect")
            cc.tween(bullet)//帧事件回调有问题，改为缓动动画
                .delay(0.5)
                .call(()=>{
                    animation.stop("effect")
                    bullet.isDie=true
                    bullet.active=false

                    bullet.removeFromParent()
                })
                .start()
            return
        }
        //转向角度
        var angle = window.getAngle(bullet.getPosition(),targetPos);
        //数学公式计算
        var x = Math.cos(angle * (Math.PI/180)) * move ;
        var y = Math.sin(angle * (Math.PI/180)) * move ;

        bullet.x += x;
        bullet.y += y;
        bullet.angle=angle
    },
});
