class Sample{
    constructor(Xpos, Ypos, bodyWidth, bodyHeight){
       this.sampleBody = Matter.Bodies.rectangle(Xpos, Ypos, bodyWidth, bodyHeight, {isStatic: true, restitution: 0.45});
       this.width = bodyWidth;
       this.height = bodyHeight;
       this.image = loadImage("rover.gif");;
       this.x = Xpos;
       this.y = Ypos;
       //World.add(world, this.sampleBody);
    }
    display(){
        var pos = this.sampleBody.position;
        push();
        imageMode(CENTER);
        // stroke("ffffff");
        fill("000000");
        image(this.image, pos.x, pos.y, this.width, this.height);
        pop();
    }
    clicked(){
       WebGL2RenderingContext(); 
    }
}