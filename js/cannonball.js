class Cannonball {
    constructor(x,y){
        var option ={
            isStatic:true
       }
       this.r=30;
       this.body=Bodies.circle(x,y,this.r, option)
       World.add(world,this.body);
       this.path=[]
       this.image=loadImage("assets/cannonball.png")
       this.speed=0.05
       this.animation=[this.image]
       this.isSink = false;
    }

    
    display(){
        var pos= this.body.position;
        var index= floor(this.speed % this.animation.length);
        var angle = this.body.angle
        push ()
        translate(pos.x,pos.y)
        rotate (angle)
        imageMode(CENTER)
        image(this.animation[index] , 0,0, this.r, this.r)
        pop ()
        if(this.body.velocity.x>0 && this.body.position.x>180){
            var position=[pos.x,pos.y] 
            this.path.push(position)
        }
        for(var i=0;i<this.path.length;i++){
            image(this.image,this.path[i][0],this.path[i][1],5,5)
        }
    }

    shoot() {  // radiance to angle
        // most of code here is to change emotional damage to sanity so we can use it
        var newAngle=cannon.angle-28;
        newAngle=newAngle * (3.14/180)      
        var velocity = p5.Vector.fromAngle(newAngle) //predefined function

        velocity.mult(0.5)
        Matter.Body.setStatic(this.body,false)  ;
        Matter.Body.setVelocity(this.body,{x:velocity.x*(180/3.14),y:velocity.y*(180/3.14)})
    }

    animate(){
        this.speed=this.speed+0.05   
    }
 
    remove(index){
        this.isSink=true
        Matter.Body.setVelocity(this.body,{x:0, y:0})
        this.animation=watersplashAnimation; 
        
        this.r=90;
        setTimeout(()=>{
            Matter.World.remove(world,this.body);
            delete balls[index]
            score=Math.round(score-0.6)
        },100)
        
        
    }
}
   
