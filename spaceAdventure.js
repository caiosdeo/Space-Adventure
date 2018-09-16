var auxOneUp = 0;
var auxAsteroide = 0;
var auxPrimosaur = 0;
var auxStar = 0;
var i = 0;
var vidas = 0;

var ranking1 = 0;
var ranking2 = 0;
var ranking3 = 0;

var tempoGameplay;
var tempoInicial;
var tempoAtual;
var tempoColisao;
var tempoOneUp;
var tempoFinal;
var tempoStar;
var tempoSlow;

var slow = 0;
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

    //Variavel para variação do tempo total de jogo
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
*  Classe Estrela
*/
var Star = function(){
    this.position = new PVector(width, random(height));
    this.velocity = new PVector(-2, 0);
};

Star.prototype.update = function() {

    // agora move objeto
    this.position.add(this.velocity);

    //teste de colisao
    if(this.position.x - mouseX <= 30 && this.position.y - mouseY <= 40 && this.position.x - mouseX >= -30 && this.position.y - mouseY >= -40 && auxStar === 0){
        auxStar++;
        tempoStar = tempoAtual;
        this.position.x = width;
        slow = 1;
        tempoSlow = second() + minute() * 60;
    }
};
Star.prototype.display = function() {
    image(getImage("cute/Star"), this.position.x, this.position.y, 30, 40);

};

Star.prototype.checkEdges = function() {

    if (this.position.x >= width) {
        auxStar = 0;
    }
    else if (this.position.x < 0) {
        this.position.x = width;
        this.position.y = random(0, height);
        auxStar = 0;
    }

    if (this.position.y > height) {
        this.position.y = 0;
    }
    else if (this.position.y < 0) {
        this.position.y = height;
    }
};

var star = new Star();
///////////////////////////////////////
/*
*  Classe 1UP
*/
var OneUp = function() {
    this.position = new PVector(width, random(height));
    this.velocity = new PVector(-5, 0);

    this.topspeed = 5;

};

OneUp.prototype.update = function() {

    // agora move objeto
    this.position.add(this.velocity);

    if(slow === 1)
    {
        this.topspeed = 1;
    }

    else {
        this.topspeed = 5;
    }

    this.velocity.limit(this.topspeed);

    if(this.position.x - mouseX <= 30 && this.position.y - mouseY <= 30 && this.position.x - mouseX >= -30 && this.position.y - mouseY >= -30 && auxOneUp === 0){
        auxOneUp++;
        vidas++;
        tempoOneUp = tempoAtual;
        this.position.x = width;
    }
};
OneUp.prototype.display = function() {
    image(getImage("space/healthheart"), this.position.x, this.position.y, 30, 30);

};

OneUp.prototype.checkEdges = function() {

    if (this.position.x >= width) {
        auxOneUp = 0;
    }
    else if (this.position.x < 0) {
        this.position.x = width;
        this.position.y = random(0, height);
        auxOneUp = 0;
    }

    if (this.position.y > height) {
        this.position.y = 0;
    }
    else if (this.position.y < 0) {
        this.position.y = height;
    }
};

var oneUp = new OneUp();

/*
    Classe PRIMOSAUR
*/

var Primosaur = function() {

    this.position = new PVector(width, random(0,height));
    this.velocity = new PVector(-3, random(-3, 3));
    // adicionando acelerando crescente mas constante ao objeto
    this.acceleration = new PVector(-0.1, 0);

    // limite de velocidade
    this.topspeed = 3;
};

Primosaur.prototype.display = function(){

    image(getImage("avatars/starky-sapling"), this.position.x, this.position.y, 100, 100);

};

Primosaur.prototype.checkEdges = function() {

    if (this.position.x > width) {
        this.velocity.x *= -1;
        auxPrimosaur = 0;
    }
    else if (this.position.x < 0) {
        this.velocity.x *= -1;
        auxPrimosaur = 0;
    }

    if (this.position.y > height) {
        this.velocity.y *= -1;
        auxPrimosaur = 0;
    }
    else if (this.position.y < 0) {
        this.velocity.y *= -1;
        auxPrimosaur = 0;
    }
};

Primosaur.prototype.update = function() {

    if(slow === 1)
    {
        this.topspeed = 1;
    }

    else {
        this.topspeed = 3;
    }

    // respeitar o limite de velocidade
    this.velocity.limit(this.topspeed);
    // agora move objeto
    this.position.add(this.velocity);

    if(this.position.x - mouseX <= 50 && this.position.y - mouseY <= 50 && this.position.x - mouseX >= -50 && this.position.y - mouseY >= -50 && auxPrimosaur === 0){
        auxPrimosaur++;
        asteroides = 1;
        tempoColisao = tempoAtual;
        vidas--;
        this.position.x = width;

        if(vidas === 0){
            drawScene3();
        }
    }
};


var primosaur = new Primosaur();


///////////////////////////////////////
/*
* Classe Mover
*/
var Mover = function() {
    this.position = new PVector(width - 40, random(0, height));
    this.velocity = new PVector(-5, 0);
    // adicionando acelerando crescente mas constante ao objeto
    this.acceleration = new PVector(-0.1, 0);

    // limite de velocidade
    this.topspeed = 7;
};

Mover.prototype.update = function() {
    // adicionando a aceleração à velocidade que já temos

    if (asteroides > 1) {
        this.velocity.add(this.acceleration);
    }

    if(asteroides === 1)
    {
        this.velocity = new PVector(-5, 0);
    }

    if(slow === 1)
    {
        this.topspeed = 1;
    }

    else {
        this.topspeed = 7;
    }

    // respeitar o limite de velocidade
    this.velocity.limit(this.topspeed);
    // agora move objeto
    this.position.add(this.velocity);

    if(this.position.x - mouseX <= 30 && this.position.y - mouseY <= 30 && this.position.x - mouseX >= -30 && this.position.y - mouseY >= -30 && auxAsteroide === 0){
        auxAsteroide++;
        vidas--;
        asteroides = 1;
        tempoColisao = tempoAtual;
        this.position.x = width;
        this.position.y = random(0, height);

        if(vidas === 0){
            asteroides = 0;
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

    if (this.position.x >= width) {

        auxAsteroide = 0;
    }
    else if (this.position.x < 0) {
        this.position.x = width;
        auxAsteroide = 0;
        this.position.y = random(0, height);

    }

    if (this.position.y > height) {
        this.position.y = 0;
    }
    else if (this.position.y < 0) {
        this.position.y = height;
    }
};

var asteroide = [new Mover(), new Mover(), new Mover()];



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
    background(173, 239, 255);
    fill(7, 14, 145);
    image(getImage("space/background"), 0,0, width, height);

    //HUD para número de vidas e o level
    textSize(20);
    fill(0,0,0);
    text("Lifes: " + vidas, 20, 35);
    text("Level: " + asteroides, 300, 35);

    // desenhar estrelas
    // makeStars();

    // desenha a nave e a desloca na tela seguindo o mouse
    image(getImage("space/rocketship"), mouseX-30, mouseY-30, 60, 60);

    //Variavel para comparação
    tempoAtual = second() + minute() * 60;

    if (tempoAtual < tempoInicial){
        tempoAtual += 60*60;
    }

    if(tempoAtual - tempoOneUp >= 120){
        //Objeto para aumentar vida
        oneUp.update();
        oneUp.checkEdges();
        oneUp.display();
    }

    if(tempoAtual - tempoStar >= 30){
        //Objeto para diminuir a velocidade dos demais
        star.update();
        star.checkEdges();
        star.display();
    }

    if(tempoAtual - tempoColisao >= 30){
        asteroides = 2;

        if(tempoAtual - tempoColisao >= 60){
            asteroides = 3;
        }

    }

    if(tempoAtual - tempoSlow <= 3)
    {
        slow = 1;
    }

    else {
        slow = 0;
    }

    //Niveis de Jogo
    //asteroide 1 ---- Level 1

    if (asteroides >= 1) {
        asteroide[0].display();
        asteroide[0].update();
        asteroide[0].checkEdges();

        //asteroide 2 ---- Level 2
        if(asteroides >= 2){
            asteroide[1].display();
            asteroide[1].update();
            asteroide[1].checkEdges();

            //asteroide 3 ---- Level 3
            if(asteroides === 3){
                asteroide[2].display();
                asteroide[2].update();
                asteroide[2].checkEdges();

                primosaur.display();
                primosaur.update();
                primosaur.checkEdges();
            }

        }

    }

};

//função para inicializar as variveis essenciais para o jogo
var iniciandoTimersVariaveis = function(){
    tempoInicial = second() + minute() * 60;
    tempoColisao = tempoInicial;
    tempoOneUp = tempoInicial;
    tempoStar = tempoInicial;
    asteroides = 1;
    vidas = 5;

};

// clicou no mouse, avança cena
mouseClicked = function() {
    if (currentScene === 1) {
        drawScene2();
        iniciandoTimersVariaveis();
    } else if (currentScene === 2) {
        drawScene3();
    } else if (currentScene === 3) {
        drawScene2();
        iniciandoTimersVariaveis();
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
