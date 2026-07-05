const weddingDate = new Date('2026-08-21T15:00:00+05:00');
function tick(){
  let diff = Math.max(0, weddingDate - new Date());
  const d=Math.floor(diff/864e5); diff-=d*864e5;
  const h=Math.floor(diff/36e5); diff-=h*36e5;
  const m=Math.floor(diff/6e4); diff-=m*6e4;
  const s=Math.floor(diff/1000);
  document.getElementById('d').textContent=d;
  document.getElementById('h').textContent=String(h).padStart(2,'0');
  document.getElementById('m').textContent=String(m).padStart(2,'0');
  document.getElementById('s').textContent=String(s).padStart(2,'0');
}
setInterval(tick,1000); tick();

const days = document.getElementById('days');
for(let i=0;i<6;i++) days.appendChild(document.createElement('span')).className='empty';
for(let i=1;i<=30;i++){const el=document.createElement('span'); el.textContent=i; if(i===12) el.className='active'; days.appendChild(el)}

const start='20261112T084500Z', end='20261112T200000Z';
const title=encodeURIComponent('Свадьба Самир и Диана');
const details=encodeURIComponent('Торжественная регистрация и праздничный банкет');
const loc=encodeURIComponent('ул. Суздальская, 10 / ул. Суздальская, 12');
document.getElementById('googleCal').href=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${loc}`;
const ics=`BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Samir Diana Wedding//RU\nBEGIN:VEVENT\nUID:samir-diana-20261112@example.com\nDTSTAMP:20261112T000000Z\nDTSTART:${start}\nDTEND:${end}\nSUMMARY:Свадьба Самир и Диана\nDESCRIPTION:Торжественная регистрация и праздничный банкет\nLOCATION:ул. Суздальская, 10 / ул. Суздальская, 12\nEND:VEVENT\nEND:VCALENDAR`;
document.getElementById('icsDownload').href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));

const modal=document.getElementById('modal');
document.getElementById('openRsvp').onclick=()=>modal.classList.add('show');
document.getElementById('closeRsvp').onclick=()=>modal.classList.remove('show');
modal.addEventListener('click',e=>{if(e.target===modal) modal.classList.remove('show')});
document.getElementById('rsvpForm').addEventListener('submit', async e=>{
  e.preventDefault();
  // Вставь сюда ссылку Google Apps Script, если нужна отправка в таблицу:
  const GOOGLE_SCRIPT_URL = '';
  const data = Object.fromEntries(new FormData(e.target).entries());
  data.invite = 'Алексей и Кристина'; data.date = '21.08.2026';
  if(GOOGLE_SCRIPT_URL){ await fetch(GOOGLE_SCRIPT_URL,{method:'POST',mode:'no-cors',body:JSON.stringify(data)}); }
  document.getElementById('ok').style.display='block';
  e.target.reset();
});
