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
        window.m_gBulletBuild=this

        this.m_bulletPool=[]
    },

    createBullet(bullet,gun){
        let target=bullet.m_target
        let worldPos=gun.convertToWorldSpaceAR(cc.v2(0,0))
        let nodePos=this.node.convertToNodeSpaceAR(worldPos)
        var angle = window.getAngle(bullet.getPosition(),nodePos)
        bullet.setPosition(nodePos)
        bullet.active=true
        bullet.parent=this.node
        bullet.isDie=false
        bullet.angle=angle

        this.m_bulletPool.push(bullet);
    },

    update (dt) {
        let move=200*dt
        let removeArr=[];//放在数组中删除，如果放在循环中删除会出现bug
        for(let i=0;i<this.m_bulletPool.length;i++){
            let bullet=this.m_bulletPool[i]
            let target=bullet.m_target
            if(bullet.isDie)continue

            let js=target.getComponent("monsterItem")
            let targetPos=this.node.convertToNodeSpaceAR(target.convertToWorldSpaceAR(cc.v2(0,0)))
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
    
                        removeArr.push(bullet)
                    })
                    .start()
                continue
            }
            //转向角度
            var angle = window.getAngle(bullet.getPosition(),targetPos);
            //数学公式计算
            var x = Math.cos(angle * (Math.PI/180)) * move ;
            var y = Math.sin(angle * (Math.PI/180)) * move ;
    
            bullet.x += x;
            bullet.y += y;
            bullet.angle=angle

            //废弃，使用数学公式计算x,y
            // if(bullet.x>target.x){
            //     bullet.x-=move
            // }
            // else{
            //     bullet.x+=move
            // }
            
            // if(bullet.y>target.y){
            //     bullet.y-=move
            // }
            // else{
            //     bullet.y+=move
            // }
        }
        
        for(let i=0;i<removeArr.length;i++){
            let bullet=removeArr[i]
            bullet.removeFromParent()
        }
    },

});
