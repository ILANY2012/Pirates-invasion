class Boat {
    constructor(x,y,w,h, boatPosition, boatAnimation ){

        var options={
            restitution:0.8, friction:1, density:1
        }
        this.body=Bodies.rectangle(x,y,w,h,options) ;  
        World.add(world,this.body);
        this.w= w;
        this.h= h;
        this.boatPosition= boatPosition;
        this.animation = boatAnimation;
        this.image=loadImage("assets/boat.png")
        this.speed = 0.05;
        this.isBroken= false

    }

    animate(){
        this.speed +=0.05;
    }

    display(){
        var pos= this.body.position; 
        var index= floor(this.speed % this.animation.length);
        var angle = this.body.angle
        push ()
        translate(pos.x,pos.y)
        imageMode(CENTER)
        rotate(angle)
        image (this.animation[index],0,this.boatPosition,this.w,this.h)
        pop ()
    }
    remove(index){
        this.animation=brokenBoatAnimation;
        this.speed=0.05;
        this.w= 300;
        this.h= 300;
        this.isBroken = true;
        setTimeout(()=>{
            Matter.World.remove(world,boats[index].body)
            delete boats[index]   
        },500)
    }
        
}
    