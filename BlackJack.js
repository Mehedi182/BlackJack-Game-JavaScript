let bjGame={
	'you': {'span':'#your-result','div':'#your-box','score':0},
	'computer': {'span':'#computer-result','div':'#computer-box','score':0},
	'card':['2','3','4','5','6','7','8','9','10', 'K','J','Q','A'],
	'cardvalue':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10, 'K':10,'J':10,'Q':10,'A':[1,11]},
	'wins':'0',
	'loss':'0',
	'draw':'0',
	'isStand':false,
	'turnsover':false,
};
let c=0;
const  you = bjGame['you'];
const  computer = bjGame['computer'];
const hitsound= new Audio("sounds/swish.m4a");
const winSound= new Audio("sounds/cash.mp3");
const lostSound= new Audio("sounds/aww.mp3");

function Hit()
{
	if(bjGame['isStand']===false&&you['score']<=21){
	let card=random();	
	showcard(card,you); 
	scorecard(card,you); 
	showScore(you);
	c=1;
}
}
function sleep(ms)
{
	return new Promise(resolve=> setTimeout(resolve,ms));
}

async function stand()
{
	if(c==1){
	bjGame['isStand']=true;

	while(computer['score']<16&&bjGame['isStand']===true){
			let card=random();

	scorecard(card,computer);
	showScore(computer);
	showcard(card,computer);
	await sleep(250);
	c=0;
	}
		bjGame['turnsover']=true;

	showresult(decidewinner());
}

}
function replay()
{
	if(bjGame['turnsover']===true&&c==0){
		bjGame['isStand']=false;
	let y=document.querySelector('#your-box').querySelectorAll('img');
	let c=document.querySelector('#computer-box').querySelectorAll('img');
	for(let i=0;i<y.length;i++){
		y[i].remove();
	}
	for(let i=0;i<c.length;i++){
		c[i].remove();
	}
	you['score']=0;
	computer['score']=0;
	document.querySelector(you['span']).textContent=0;
	document.querySelector(you['span']).style.color='white';
	document.querySelector(computer['span']).textContent=0;
	document.querySelector(computer['span']).style.color='white';
	document.querySelector('#blackjacktxt').textContent="Let's Play";
	document.querySelector('#blackjacktxt').style.color='white';

}
}
function showcard(card,activeplayer)
{

	let image=document.createElement('img');
	image.src=`images/${card}.png`;
	document.querySelector(activeplayer['div']).appendChild(image);
	hitsound.play();
}
function random()
{
	let index=Math.floor(Math.random()*13);
	return bjGame['card'][index];
}
function scorecard(card,activeplayer)
{
	if(card==='A'){
		if (activeplayer['score']+bjGame['cardvalue'][card][1]<=21) {
			activeplayer['score']+=bjGame['cardvalue'][card][1];
		}
		else
		{
			activeplayer['score']+=bjGame['cardvalue'][card][0];

		}
	}
	else
	{
		activeplayer['score']+=bjGame['cardvalue'][card];
	}
}
function showScore(activeplayer)
{
	if(activeplayer['score']<=21)
	{


document.querySelector(activeplayer['span']).textContent=activeplayer['score'];
}
else{
	document.querySelector(activeplayer['span']).textContent='BUST!';
	document.querySelector(activeplayer['span']).style.color='red';
}
}


function decidewinner()
{
	let winner;

	if(you['score']<=21)
	{
		if(you['score']>computer['score']||computer['score']>21)
		{
			winner=you;
			bjGame['wins']++;

		}
		else if(you['score']<computer['score'])
		{
			winner=computer;
			bjGame['loss']++;
		}
		else if(you['score']===computer['score'])
		{
			bjGame['draw']++;
		}	
	}
	else if(you['score']>21&&computer['score']<=21)
	{
		winner=computer;
		bjGame['loss']++;
	}
	else if(you['score']>21&&computer['score']>21)
	{
		bjGame['draw']++;
	}

	return winner;
}

function showresult(winner)
{
	if(bjGame['turnsover']===true){
	let message,messageColor;
	if(winner===you)
	{
		document.querySelector('#win').textContent=bjGame['wins'];
		message='You Won!!';
		messageColor='#BDEDFF';
		winSound.play();
	}

	else if(winner===computer){
		document.querySelector('#loss').textContent=bjGame['loss'];
		message='You Lost';
		messageColor='red';
		lostSound.play();
	}
	else {
		document.querySelector('#draw').textContent=bjGame['draw'];
		message='You Draw';
		messageColor='yellow';
	}
	document.querySelector('#blackjacktxt').textContent=message;
	document.querySelector('#blackjacktxt').style.color=messageColor;
}
}
function resetscore()
{
bjGame['wins']=0;
bjGame['loss']=0;
bjGame['draw']=0;
document.querySelector('#win').textContent=bjGame['wins'];
document.querySelector('#loss').textContent=bjGame['loss'];
document.querySelector('#draw').textContent=bjGame['draw'];


}
function Tips()
{
	alert("if you can achive the score upto 21 and the computer don't able to score more than you then you will won.If your score is more than 21 you will be bust!");
}