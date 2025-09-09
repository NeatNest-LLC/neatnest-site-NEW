// year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// simple testimonial slider
const slides = Array.from(document.querySelectorAll('.slide'));
let idx = 0;
function show(i){ slides.forEach((s,n)=>s.classList.toggle('active', n===i)); }
document.getElementById('next').onclick = ()=>{ idx=(idx+1)%slides.length; show(idx); };
document.getElementById('prev').onclick = ()=>{ idx=(idx-1+slides.length)%slides.length; show(idx); };
show(idx);
