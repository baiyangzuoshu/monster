// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    eventListener:Array<cc.Node>=[]
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    addEventListener(self:cc.Node,type:string,call:any){
        if(-1!=this.eventListener.indexOf(self)){
            this.eventListener.push(self)
        }

        let pos=this.eventListener.indexOf(self)
        
    }

    start () {

    }

    hello(){
        console.log("say hello")
    }

    say(){
        console.log("yjm say")
    }

    apple(){
        console.log("apple")
    }

    person(){
        console.log("person")
    }

    man(){
        console.log("man")
    }

    woman(){
        console.log("woman")
    }

    bulleSort(arr:[]){
        for(let i=0;i<arr.length;i++){
            for(let j=i+1;j<arr.length;j++){
                if(arr[i]>arr[j]){
                    let temp=arr[i]
                    arr[i]=arr[j]
                    arr[j]=temp
                }
            }
        }
    }

    hihi(){
        console.log("hihi")
    }

    kk(){
        console.log("kk")
    }

    muxin(){
        let a=10
        let b=20
        let c=a/b
        let d=a+c
        let m=d%b
        let j=Math.abs(m)
        let kk=Math.floor(j)
        let oo=Math.ceil(kk)
        console.log("qwertyuiopasdfghjklzxcvbnm");
    }

    sortZIndex(){
        let children:Array<cc.Node>=[]
        for(let i=0;i<children.length;i++){
            let child1=children[i]
            for(let j=i+1;j<children.length;j++){
                let child2=children[j]
                if(child1.zIndex<child2.zIndex){
                    let temp=child1
                    child1=child2
                    child2=temp
                }
            }
        }
    }
}

