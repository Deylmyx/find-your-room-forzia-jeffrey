const $ = id => document.getElementById(id);
const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’']/g,"").toLowerCase().trim();

function esc(s){ return String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

function showTag(g){
  const mates = !g.place ? [] : GUESTS.filter(o => o !== g && o.place === g.place && o.room === g.room).map(o => o.name);
  const extra = [g.note].filter(Boolean).join(" ");
  $("out").innerHTML =
    '<div class="tag"><p class="who">'+esc(g.name)+'</p><p class="lbl">'+(g.place ? 'Your room at '+esc(g.place) : 'Your accommodation')+'</p>' +
    '<p class="num">'+esc(g.room)+'</p>' +
    '<p class="note">'+esc(STAY)+'</p>' + (extra ? '<p class="mates">'+esc(extra)+'</p>' : '') +
    (mates.length ? '<p class="mates">Sharing with: '+esc(mates.join(", "))+'</p>' : '') + '</div>' +
    '<button class="dl" type="button" id="dl">Download my room card</button>' +
    '<button class="again" type="button" id="again">Search another name</button>';
  $("dl").onclick = () => downloadCard(g, mates);
  $("again").onclick = () => { $("q").value=""; $("out").innerHTML=""; $("q").focus(); };
}

function search(){
  const words = norm($("q").value).split(/\s+/).filter(Boolean);
  const out = $("out");
  if (!words.length || words.join("").length < 2){
    out.innerHTML = '<p class="msg">Enter at least two letters of your name.</p>'; return;
  }
  const hits = GUESTS.filter(g => { const n = norm(g.name); return words.every(w => n.includes(w)); });
  if (hits.length === 1){ showTag(hits[0]); }
  else if (hits.length > 1){
    out.innerHTML = '<p class="msg">We found a few matches. Which one is you?</p><div class="pick">' +
      hits.map((g,i) => '<button type="button" data-i="'+i+'">'+esc(g.name)+'</button>').join("") + '</div>';
    out.querySelectorAll("[data-i]").forEach(b => b.onclick = () => showTag(hits[+b.dataset.i]));
  } else {
    out.innerHTML = '<p class="msg">We couldn’t find “'+esc($("q").value.trim())+'”. Check the spelling, or try only your last name.</p>';
  }
}

$("f").addEventListener("submit", search);

// ---- Download the room card as a PNG image ----
function roundRect(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath();}

function wrapNames(x,names,max){
  const lines=[]; let line="";
  names.forEach((n,i)=>{
    const piece=n+(i<names.length-1?", ":"");
    if(line && x.measureText(line+piece).width>max){lines.push(line.trim());line=piece;} else line+=piece;
  });
  if(line) lines.push(line.trim());
  return lines;
}

async function saveBlob(blob, filename){
  try{
    if (window.claude && window.claude.use){
      const d = await window.claude.use("downloads");
      if (d){ await d.save({filename, data: blob}); return; }
    }
  }catch(e){ if (e && e.code === "declined") return; }
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download=filename;
  document.body.appendChild(a); a.click(); a.remove();
}

async function downloadCard(g, mates){
  try{
    await Promise.all(['400 80px "Pinyon Script"','italic 500 40px "Cormorant Garamond"','600 60px "Cormorant Garamond"','400 30px "Jost"'].map(f=>document.fonts.load(f)));
  }catch(e){}
  const W=1080,H=1350,c=document.createElement("canvas"); c.width=W; c.height=H;
  const x=c.getContext("2d"); x.textAlign="center";
  const INK="#2B382A", SAGE="#566D4E", MUTED="#566353", LINE="#BFCBBC";
  x.fillStyle="#E4EBE2"; x.fillRect(0,0,W,H);
  roundRect(x,80,80,W-160,H-160,48); x.fillStyle="#F8F4E8"; x.fill(); x.strokeStyle=LINE; x.lineWidth=3; x.stroke();
  x.fillStyle=SAGE; x.beginPath(); x.arc(W/2,175,26,0,Math.PI*2); x.fill();
  x.fillStyle=INK; x.font='400 120px "Pinyon Script", cursive'; x.fillText("Forzia & Jeffrey",W/2,360);
  x.fillStyle=SAGE; x.font='italic 500 44px "Cormorant Garamond", Georgia, serif'; x.fillText(STAY,W/2,430);
  x.strokeStyle=LINE; x.beginPath(); x.moveTo(240,490); x.lineTo(840,490); x.stroke();
  x.fillStyle=INK; x.font='600 64px "Cormorant Garamond", Georgia, serif'; x.fillText(g.name,W/2,600);
  x.fillStyle=MUTED; x.font='400 34px "Jost", system-ui, sans-serif'; x.fillText(g.place ? "Your room at "+g.place : "Your accommodation",W/2,665);
  let size=150; x.fillStyle=SAGE;
  do{ x.font='600 '+size+'px "Cormorant Garamond", Georgia, serif'; size-=6; } while(x.measureText(g.room).width>800 && size>40);
  x.fillText(g.room,W/2,840);
  if(mates.length){
    x.strokeStyle=LINE; x.beginPath(); x.moveTo(240,930); x.lineTo(840,930); x.stroke();
    x.fillStyle=MUTED; x.font='400 32px "Jost", system-ui, sans-serif'; x.fillText("Sharing with",W/2,1000);
    x.fillStyle=INK; x.font='400 38px "Jost", system-ui, sans-serif';
    wrapNames(x,mates,760).slice(0,5).forEach((l,i)=>x.fillText(l,W/2,1060+i*54));
  }
  if(!mates.length && g.note){
    x.strokeStyle=LINE; x.beginPath(); x.moveTo(240,930); x.lineTo(840,930); x.stroke();
    x.fillStyle=INK; x.font='400 38px "Jost", system-ui, sans-serif';
    wrapWords(x,g.note,760).slice(0,4).forEach((l,i)=>x.fillText(l,W/2,1010+i*54));
  }
  c.toBlob(b=>{ if(b) saveBlob(b,"room-"+norm(g.name).replace(/[^a-z0-9]+/g,"-")+".png"); },"image/png");
}

function wrapWords(x,text,max){
  const lines=[]; let line="";
  text.split(" ").forEach(w=>{
    const t=line?line+" "+w:w;
    if(line && x.measureText(t).width>max){lines.push(line);line=w;} else line=t;
  });
  if(line) lines.push(line);
  return lines;
}
