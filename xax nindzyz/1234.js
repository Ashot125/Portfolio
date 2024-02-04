
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const backgroundImg = document.createElement("img");
backgroundImg.src = "https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg?region=0,0,1920,1080";

const heroImg = document.createElement("img");
heroImg.src = "https://1001freedownloads.s3.amazonaws.com/vector/thumb/135655/nicubunu_Game_baddie_Ninja.png";

const starImg = document.createElement("img");
starImg.src = "https://blog.knife-depot.com/wp-content/uploads/2020/03/shuriken-676x676.png";

const rabbitImg = document.createElement("img");
rabbitImg.src = "https://preview.redd.it/4e15s7ljf2o41.png?width=256&format=png&auto=webp&s=99b4d97d6c2eeacbb218fc6e31773bd3aecc385c";

const stabAudio = document.createElement("audio");
stabAudio.src = "https://soundbible.com//mp3/Stab-SoundBible.com-766875573.mp3";


const audio = document.createElement("audio");
audio.src = "http://www.slspencer.com/Sounds/Star Trek Sounds/sounds/PhotonTorp.mp3";

let data = {
  hero: {
    xDelta: 0,
    yDelta: 0,
    x: 10,
    y: 240,
    width: 100,
    height: 100
  },
 
  bullets: [],
  rabbits: []
};

function intersect(rect1, rect2) {
    const x = Math.max(rect1.x, rect2.x),
        num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
        y = Math.max(rect1.y, rect2.y),
        num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
    return (num1 >= x && num2 >= y);
};

function update() {
  data.hero.x += data.hero.xDelta;
  data.hero.y += data.hero.yDelta;

  data.bullets.forEach((bullet)=>{
    data.rabbits.forEach((rabbit)=>{
      if(intersect(rabbit, bullet)) {
          stabAudio.currentTime = 0;
          stabAudio.play();
          bullet.deleteMe = true;
          rabbit.deleteMe = true;
      }
    });
    });
  
  data.bullets = data.bullets.filter(bullet=> {
    return bullet.deleteMe !== true;
  });
  
  data.rabbits = data.rabbits.filter(rabbit=> {
    return rabbit.deleteMe !== true;
  });

  data.bullets.forEach(bullet=> {
    bullet.x += bullet.xDelta;
  });

  data.bullets = data.bullets.filter(bullet=> {
    if (bullet.x > canvas.width) {
      return false;
    }
    return true;
  });
  
  data.rabbits.forEach(rabbit=> {
    rabbit.x += rabbit.xDelta;
  });
  
  if(data.rabbits.length === 0) {
     data.rabbits.push({
       xDelta: -5,
       x: canvas.width - 100,
       y: data.hero.y,
       width: 100,
       height: 100
     });
  }
}

function draw() {
  context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

  context.drawImage(heroImg, data.hero.x, data.hero.y, data.hero.width, data.hero.height);

  data.bullets.forEach(function(bullet) {
    context.drawImage(starImg, bullet.x, bullet.y, bullet.width, bullet.height);
  });


  data.rabbits.forEach(function(rabbit) {
    context.drawImage(rabbitImg, rabbit.x, rabbit.y, rabbit.width, rabbit.height);
  });
}

function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
}

loop();

document.addEventListener("keydown", function(evt) {
  if (evt.code === "ArrowRight") {
    data.hero.xDelta = 1;
  } else if (evt.code === "ArrowLeft") {
    data.hero.xDelta = -1;
  } else if(evt.code==="ArrowUp"){
    data.hero.yDelta=-1;
}else if(evt.code==="ArrowDown"){
    data.hero.yDelta=1;
}else {
    audio.currentTime = 0;
    audio.play();
    data.bullets.push({
      xDelta: 8,
      x: data.hero.x + data.hero.width,
      y: data.hero.y + data.hero.height / 2,
      width: 20,
      height: 20
    });
  }
});
document.addEventListener("keyup", function(evt) {
  data.hero.xDelta = 0;
  data.hero.yDelta=0;
});
