// LOADER
setTimeout(function(){ var l=document.getElementById('loader'); if(l) l.classList.add('hidden'); }, 1800);

// CURSOR
var cursor=document.getElementById('cursor'), follower=document.getElementById('cursorFollower');
var mx=0,my=0,fx=0,fy=0;
document.addEventListener('mousemove',function(e){ mx=e.clientX; my=e.clientY; if(cursor){ cursor.style.left=mx+'px'; cursor.style.top=my+'px'; } });
function af(){ fx+=(mx-fx)*.12; fy+=(my-fy)*.12; if(follower){ follower.style.left=fx+'px'; follower.style.top=fy+'px'; } requestAnimationFrame(af); }
af();
document.querySelectorAll('a,button,.sk-card,.cert-card,.edu-card').forEach(function(el){
  el.addEventListener('mouseenter',function(){ if(cursor){cursor.style.width='20px';cursor.style.height='20px';} if(follower){follower.style.width='55px';follower.style.height='55px';follower.style.opacity='.3';} });
  el.addEventListener('mouseleave',function(){ if(cursor){cursor.style.width='10px';cursor.style.height='10px';} if(follower){follower.style.width='35px';follower.style.height='35px';follower.style.opacity='.5';} });
});

// PARTICLES
var canvas=document.getElementById('particleCanvas');
if(canvas){
  var ctx=canvas.getContext('2d'), particles=[];
  function resize(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
  resize(); window.addEventListener('resize',resize);
  function Particle(){ this.reset(); }
  Particle.prototype.reset=function(){ this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.size=Math.random()*1.5+.3; this.sx=(Math.random()-.5)*.25; this.sy=(Math.random()-.5)*.25; this.op=Math.random()*.3+.1; this.col=Math.random()>.6?'#ff6b35':'#f7931e'; };
  Particle.prototype.update=function(){ this.x+=this.sx; this.y+=this.sy; if(this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height) this.reset(); };
  Particle.prototype.draw=function(){ ctx.globalAlpha=this.op; ctx.fillStyle=this.col; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); };
  for(var i=0;i<35;i++) particles.push(new Particle());
  var fc=0;
  function anim(){ fc++; if(fc%2===0){ ctx.clearRect(0,0,canvas.width,canvas.height); ctx.save(); particles.forEach(function(p){p.update();p.draw();}); ctx.restore(); } requestAnimationFrame(anim); }
  anim();
}

// NAVBAR
var navbar=document.getElementById('navbar'), hamburger=document.getElementById('hamburger'), navLinks=document.getElementById('navLinks');
window.addEventListener('scroll',function(){ if(navbar) navbar.classList.toggle('scrolled',window.scrollY>60); });
if(hamburger){ hamburger.addEventListener('click',function(){ hamburger.classList.toggle('active'); navLinks.classList.toggle('open'); }); }
document.querySelectorAll('.nav-links a').forEach(function(a){ a.addEventListener('click',function(){ hamburger.classList.remove('active'); navLinks.classList.remove('open'); }); });

// ACTIVE NAV
var allSecs=document.querySelectorAll('section[id]'), navAs=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',function(){ var cur=''; allSecs.forEach(function(s){ if(window.scrollY>=s.offsetTop-120) cur=s.id; }); navAs.forEach(function(a){ a.classList.toggle('active',a.getAttribute('href')==='#'+cur); }); });

// TYPING
var typedEl=document.getElementById('typedText');
if(typedEl){
  var words=['Web Developer','Web Designer','HTML Coder','CSS Stylist','Team Leader','Problem Solver'], wi=0,ci=0,del=false;
  function typeLoop(){ var word=words[wi]; if(!del){ typedEl.textContent=word.slice(0,++ci); if(ci===word.length){del=true;setTimeout(typeLoop,1800);return;} } else{ typedEl.textContent=word.slice(0,--ci); if(ci===0){del=false;wi=(wi+1)%words.length;} } setTimeout(typeLoop,del?60:90); }
  setTimeout(typeLoop,2000);
}

// SCROLL REVEAL
var revEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
var revObs=new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting){e.target.classList.add('visible');revObs.unobserve(e.target);} }); },{threshold:.12});
revEls.forEach(function(el){ revObs.observe(el); });

// SKILL BARS
var fills=document.querySelectorAll('.sk-fill');
var barObs=new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting){e.target.style.width=e.target.dataset.w+'%';barObs.unobserve(e.target);} }); },{threshold:.5});
fills.forEach(function(b){ barObs.observe(b); });

// COUNT UP
function countUp(el,target){ var s=0,step=target/90; function up(){ s=Math.min(s+step,target); el.textContent=Math.floor(s); if(s<target) requestAnimationFrame(up); } requestAnimationFrame(up); }
var cntObs=new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting){countUp(e.target,+e.target.dataset.count);cntObs.unobserve(e.target);} }); },{threshold:.5});
document.querySelectorAll('.a-num').forEach(function(el){ cntObs.observe(el); });

// CONTACT FORM
var contactForm=document.getElementById('contactForm'), formStatus=document.getElementById('formStatus'), sendBtn=document.getElementById('sendBtn');
if(contactForm){
  contactForm.addEventListener('submit',function(e){
   
    var name=document.getElementById('senderName').value.trim();
    var email=document.getElementById('senderEmail').value.trim();
    var phone=document.getElementById('senderPhone').value.trim();
    var message=document.getElementById('message').value.trim();
    if(!name||!email||!message){ formStatus.textContent='⚠️ Please fill Name, Email and Message.'; formStatus.className='form-status error'; return; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ formStatus.textContent='⚠️ Enter a valid email address.'; formStatus.className='form-status error'; return; }
    sendBtn.disabled=true; sendBtn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Opening...';
    var subject=encodeURIComponent('Portfolio Message from '+name);
    var body=encodeURIComponent('Hello Mohamed Hasif K,\n\nNew message from your portfolio!\n\nName: '+name+'\nEmail: '+email+'\n'+(phone?'Phone: '+phone+'\n':'')+'\nMessage:\n'+message+'\n\n---\nSent via Portfolio Website');
    
    setTimeout(function(){
      contactForm.reset();
      formStatus.textContent='✅ Email client opened! Send it to reach Mohamed Hasif directly.';
      formStatus.className='form-status success';
      sendBtn.disabled=false; sendBtn.innerHTML='Send to Gmail <i class="fa-solid fa-paper-plane"></i>';
      setTimeout(function(){ formStatus.textContent=''; formStatus.className='form-status'; },7000);
    },900);
  });
}