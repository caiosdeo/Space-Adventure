var aux = 0;
var i = 0;
var vidas = 0;

var ranking1 = 0;
var ranking2 = 0;
var ranking3 = 0;

var tempoGameplay;
var tempoInicial;
var tempoColisao;
var tempoFinal;

var bateu = 0;
var atualizar = 1;
var auxAtualizar = 0;
var contadorColisao;

var asteroides = 1;


// controla a cena
var currentScene;

// contador de estrelas
var count = 0;

// funcao desenha estrela
var makeStars = function() {
    fill(219, 219, 219);
    ellipse(random(width),random(height),5,5);
    count++;
};

//TELA DE GAME OVER scene3
var drawScene3 = function() {

    tempoFinal = second() + minute() * 60;

    if (tempoFinal < tempoInicial){
        tempoFinal += 60*60;
    }

    tempoGameplay = tempoFinal - tempoInicial;

    currentScene = 3;
    background(0, 0, 0);
    textSize(40);
    fill(255, 0, 0);

    text("GAME OVER", 85, height/2 + 5);
    text("You Died", 125, height/2 + 50);
    textSize(20);
    text("Try Again", width/2 - 40, height/2 + 120);

    //ATUALIZAÇÃO DO PLACAR
    if (tempoGameplay >= ranking1 || ranking1 === 0){
        ranking3 = ranking2;
        ranking2 = ranking1;
        ranking1 = tempoGameplay;
    }

    else if (tempoGameplay >= ranking2 || ranking2 === 0){
        ranking3 = ranking2;
        ranking2 = tempoGameplay;

    }

    else if (tempoGameplay >= ranking3 || ranking3 === 0){
        ranking3 = tempoGameplay;
    }

    text("Rank 1: " + ranking1 + " s", width/2 - 50, 35);
    text("Rank 2: " + ranking2 + " s", width/2 - 50, 70);
    text("Rank 3: " + ranking3 + " s", width/2 - 50, 105);
};

///////////////////////////////////////
/*
* Objeto Mover
*/
var Mover = function() {
  this.position = new PVector(random(width), random(height));
  this.velocity = new PVector(random(-2, 2), 0);
  // adicionando acelerando crescente mas constante ao objeto
  this.acceleration = new PVector(-0.1, 0);
  // limite de velocidade BOra no ifet quinta?
  this.topspeed = 10;
};

Mover.prototype.update = function() {
    // adicionando a aceleração à velocidade que já temos
    this.velocity.add(this.acceleration);
    // respeitar o limite de velocidae
    this.velocity.limit(this.topspeed);
    // agora move objeto
    this.position.add(this.velocity);

    if(this.position.x - mouseX <= 30 && this.position.y - mouseY <= 30 && this.position.x - mouseX >= -30 && this.position.y - mouseY >= -30 && aux === 0){
        aux++;
        bateu = 1;
        vidas--;

        if( vidas === 0){
            drawScene3();

        }
    }
};

Mover.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    ellipse(this.position.x, this.position.y, 30, 30);
};

Mover.prototype.checkEdges = function() {

    if (this.position.x > width) {
        this.position.x = 0;
        aux = 0;
    }
    else if (this.position.x < 0) {
        this.position.x = width;
        aux = 0;
        this.position.y = random(0, height);

    }

    if (this.position.y > height) {
        this.position.y = 0;
    }
    else if (this.position.y < 0) {
        this.position.y = height;
    }
};

var mover = [new Mover(), new Mover(), new Mover()];
///////////////////////////////////////
// Scene 1
var drawScene1 = function() {
    currentScene = 1;
    background(0, 0, 0);
    fill(255, 255, 255);
    textSize(39);
    text("Space Adventure", 65, height/2);
    textSize(15);
    text("Clique para começar", (width/2)-60, (height/2)+50);

};

// Scene 2
var drawScene2 = function() {
    currentScene = 2;
    contadorColisao = 0;
    background(173, 239, 255);
    fill(7, 14, 145);
    image(getImage("space/background"), 0,0, width, height);

    // desenhar estrelas
    // makeStars();

    // desenha a nave e a desloca na tela seguindo o mouse
    image(getImage("space/rocketship"), mouseX-30, mouseY-30, 60, 60);

    // crie ou chama uma função que desenhe e mova 1 objeto
      mover[0].update();
      mover[0].checkEdges();
      mover[0].display();

    // crie um função de aceleração do objeto


    textSize(20);
    fill(0,0,0);
    text("Lifes: " + vidas, 20, 35);


    var tempoAtual = second() + minute() * 60;

    if (tempoAtual < tempoInicial){
        tempoAtual += 60*60;
    }

    if(bateu){
        asteroides = 1;
        tempoColisao = tempoAtual;
        contadorColisao = 0;
        bateu = 0;
    }else{

        contadorColisao += tempoAtual - tempoColisao;
        atualizar = 0;

    }

    println(contadorColisao);

    if(contadorColisao >= 5){

        asteroides = 2;

        if(contadorColisao >= 10){

            asteroides = 3;
        }

    }

    if(asteroides >= 2){

        mover[1].update();
        mover[1].checkEdges();
        mover[1].display();

        if(asteroides === 3){
            mover[2].update();
            mover[2].checkEdges();
            mover[2].display();

        }

    }

};


// clicou no mouse, avança cena
mouseClicked = function() {
    if (currentScene === 1) {
        drawScene2();
        contadorColisao = 0;
        tempoInicial = second() + minute() * 60;
        tempoColisao = tempoInicial;
        asteroides = 0;
        vidas = 5;
    } else if (currentScene === 2) {
        drawScene3();
    } else if (currentScene === 3) {
        drawScene2();
        contadorColisao = 0;
        tempoInicial = second() + minute() * 60;
        tempoColisao = tempoInicial;
        asteroides = 0;
        vidas = 5;

    }
};



// funcao draw que desenha na tela.
draw = function() {
    if (count < 300 && currentScene === 1) {
        makeStars();
    }
    if (currentScene === 2) {
        // chame a função para desenha a posição da nave no cenário
        drawScene2();
    }
};

// vamos começar pela Cena 1
drawScene1();
