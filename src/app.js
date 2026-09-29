(function(){
"use strict";
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};

/* cursor em dois tons */
var cur=$("#cur"),dot=$("#dot"),tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty;
addEventListener("mousemove",function(e){tx=e.clientX;ty=e.clientY;
  dot.style.transform="translate3d("+tx+"px,"+ty+"px,0)";});
(function loop(){cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;cur.style.transform="translate3d("+cx+"px,"+cy+"px,0)";requestAnimationFrame(loop)})();
addEventListener("mouseover",function(e){
  document.body.classList.toggle("hot",!!e.target.closest("button,a,[data-go],.canal,.ficha,.cen,.cx,.tr"));});

/* palco */
var stage=$("#stage");
function fit(){var s=Math.min(innerWidth/1600,innerHeight/900);if(!(s>0))s=1;
  stage.style.transform="translate(-50%,-50%) scale("+s+")";}
addEventListener("resize",fit);fit();

var slides=$$(".slide"),N=slides.length,i=0,busy=false;
var TITLES=["Projetos que viram ativo","Contexto: quatro canais","Vitrine virtual do portfólio","Por que projeto e não fee","Três ondas",
            "Onda 1: destravar","Onda 2: padronizar","Onda 3: escalar","O que fica com a FTW",
            "Cronograma","Cenários de investimento","Para avançar"];

function chrome(){
  var dark=slides[i].classList.contains("dark");
  ["#top","#bot","#grain",".hint"].forEach(function(s){var el=$(s);if(el)el.classList.toggle("inv",dark)});
  $("#prog").style.width=((i+1)/N*100)+"%";
  $("#count").innerHTML="<b>"+String(i+1).padStart(2,"0")+"</b> / "+N;
  var p=slides[i].getAttribute("data-part")||"";
  var n=i===0?"":(i<=3?"Parte 01":(i<=7?"Parte 02":(i<=9?"Parte 03":"Parte 04")));
  $("#partlbl").innerHTML=n?("<i>"+n+"</i> · "+p):("<i>"+p+"</i>");
  $$("#mlist button").forEach(function(b,k){b.classList.toggle("cur",k===i)});
  $("#hint").style.opacity=i===0?1:0;
}
function go(n){
  n=Math.max(0,Math.min(N-1,n)); if(n===i||busy) return; busy=true;
  var old=slides[i]; old.classList.remove("on"); old.classList.add("out");
  setTimeout(function(){old.classList.remove("out")},390);
  i=n; slides[i].classList.add("on"); chrome(); enter(slides[i]);
  setTimeout(function(){busy=false},390);
}
function enter(sec){
  // o iframe da vitrine so carrega quando a tela abre: sao 15 MB de modelos
  $$("iframe[data-src]",sec).forEach(function(f){
    f.src=f.dataset.src; f.removeAttribute("data-src");
  });
  $$("[data-cu]",sec).forEach(function(el){
    var end=+el.dataset.cu,t0=null;
    function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/900,1),e=1-Math.pow(1-p,3);
      el.textContent=Math.round(end*e); if(p<1) requestAnimationFrame(step);}
    el.textContent="0"; requestAnimationFrame(step);
  });
}

/* tela 02: canais */
$$(".canal").forEach(function(c){c.addEventListener("click",function(){
  $$(".canal").forEach(function(x){x.classList.remove("sel")}); c.classList.add("sel");});});

/* tela 03: fee x projeto nos meses 1, 3 e 6 */
var MOM=[
 {x:34,a:"A demanda represada preenche a agenda. Parece o modelo perfeito.",
       b:"O primeiro projeto entra com escopo, prazo e preço fechados."},
 {x:154,a:"O represado acabou. Sobra <b>capacidade paga e ociosa</b>.",
        b:"O primeiro ativo está entregue e o time da FTW <b>já usa sozinho</b>."},
 {x:274,a:"O contrato é cancelado e <b>nada do que foi feito virou ferramenta</b>.",
        b:"Três ativos no ar. A próxima onda <b>só entra se houver necessidade</b>."}
];
function mom(k){
  var m=MOM[k];
  $("#mkA").setAttribute("transform","translate("+(m.x-34)+",0)");
  $("#mkB").setAttribute("transform","translate("+(m.x-34)+",0)");
  $("#capA").innerHTML=m.a; $("#capB").innerHTML=m.b;
}
$("#mom").addEventListener("click",function(e){
  var b=e.target.closest("button[data-m]"); if(!b) return;
  $$("button",this).forEach(function(x){x.classList.remove("sel")}); b.classList.add("sel");
  mom(+b.dataset.m);
});
mom(0);

/* tela 10: cenários */
var CEN=[
 {nome:"Destravar", mes:"R$ 14.100", proj:3, fee:"R$ 107.100 a menos"},
 {nome:"Construir", mes:"R$ 17.900", proj:5, fee:"R$ 59.900 a menos"},
 {nome:"Sistema completo", mes:"R$ 17.900", proj:7, fee:"R$ 24.100 a menos"}
];
function cen(k){
  var c=CEN[k];
  $("#rNome").textContent=c.nome; $("#rMes").innerHTML="<em>"+c.mes+"</em>";
  $("#rProj").textContent=c.proj; $("#rFee").textContent=c.fee;
}
$("#cens").addEventListener("click",function(e){
  var c=e.target.closest("[data-cen]"); if(!c) return;
  $$("[data-cen]",this).forEach(function(x){x.classList.remove("sel")}); c.classList.add("sel");
  cen(+c.dataset.cen);
});
cen(1);

/* navegação */
document.addEventListener("click",function(e){
  var g=e.target.closest("[data-go]"); if(g){go(+g.dataset.go); $("#menu").classList.remove("on");}
});
$("#mlist").innerHTML=TITLES.map(function(t,k){
  return '<li><button data-go="'+k+'"><b>'+String(k+1).padStart(2,"0")+'</b><span>'+t+'</span><i>'+
    (slides[k].getAttribute("data-part")||"")+'</i></button></li>';}).join("");
$("#bMenu").addEventListener("click",function(){$("#menu").classList.add("on")});
$("#bClose").addEventListener("click",function(){$("#menu").classList.remove("on")});
$("#bPrint").addEventListener("click",function(){window.print()});
$("#prev").addEventListener("click",function(){go(i-1)});
$("#next").addEventListener("click",function(){go(i+1)});
addEventListener("keydown",function(e){
  if(e.key==="ArrowRight"||e.key==="PageDown"||e.key===" "){e.preventDefault();go(i+1)}
  else if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();go(i-1)}
  else if(e.key==="Home"){go(0)} else if(e.key==="End"){go(N-1)}
  else if(e.key==="m"||e.key==="M"){$("#menu").classList.toggle("on")}
  else if(e.key==="Escape"){$("#menu").classList.remove("on")}
});
var sx=0,sy=0;
addEventListener("touchstart",function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
addEventListener("touchend",function(e){var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
  if(Math.abs(dx)>54&&Math.abs(dx)>Math.abs(dy)) go(dx<0?i+1:i-1);},{passive:true});

slides[0].classList.add("on"); chrome(); enter(slides[0]);
if(location.hash){var hh=parseInt(location.hash.slice(1),10); if(hh>0&&hh<=N) go(hh-1);}
})();
