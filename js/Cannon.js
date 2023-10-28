class Cannon{
    constructor(x,y,w,h,angle){
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.angle = angle;
      this.cannonImg= loadImage("assets/canon.png")
      this.cannon_base= loadImage("assets/cannonBase.png")
    }

    display(){
      
      if(keyIsDown(UP_ARROW) && this.angle >= -10 ){
        this.angle=this.angle-1
      }
      if(keyIsDown(DOWN_ARROW) && this.angle <= 50 ){
        this.angle=this.angle+1
      }
      
      image (this.cannon_base,70,30,200,200);

      push ();
     
      translate(this.x,this.y)
      rotate(this.angle);
      imageMode(CENTER);
      image (this.cannonImg,0,0,this.w,this.h);
      pop ();
      
    }
}