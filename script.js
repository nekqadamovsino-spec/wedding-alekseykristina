const weddingDate = new Date("2026-08-21T15:00:00+05:00");
const weddingDay = 21;
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwNgw8RAgv7WIxIKs76zvM_W4vbIdXT0n5GOgq6mDBY6tZq8nr1Dc4PEuOqprHC7mWz/exec";
function pad(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const diff = weddingDate - new Date();

  const d = document.getElementById("d");
  const h = document.getElementById("h");
  const m = document.getElementById("m");
  const s = document.getElementById("s");

  if (!d || !h || !m || !s) return;

  if (diff <= 0) {
    d.textContent = "0";
    h.textContent = "00";
    m.textContent = "00";
    s.textContent = "00";
    return;
  }

  d.textContent = Math.floor(diff / 86400000);
  h.textContent = pad(Math.floor(diff / 3600000) % 24);
  m.textContent = pad(Math.floor(diff / 60000) % 60);
  s.textContent = pad(Math.floor(diff / 1000) % 60);
}

function renderCalendar() {
  const days = document.getElementById("days");
  if (!days) return;

  days.innerHTML = "";

  const firstDayOffset = 5; // 1 августа 2026 — суббота
  const daysInMonth = 31;

  for (let i = 0; i < firstDayOffset; i++) {
    const empty = document.createElement("span");
    empty.className = "empty";
    days.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const span = document.createElement("span");
    span.textContent = day;

    if (day === weddingDay) {
      span.className = "active";
    }

    days.appendChild(span);
  }
}

function setupCalendarLinks() {
  const googleCal = document.getElementById("googleCal");
  const icsDownload = document.getElementById("icsDownload");

  const title = "Свадьба Алексея и Кристины";
  const details = "Сбор гостей и церемония в 15:00, банкет в 16:00.";
  const location = "г. Оренбург, ул. 60 лет Октября, д. 19";

  const start = "20260821T100000Z";
  const end = "20260821T180000Z";

  if (googleCal) {
    googleCal.href =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(title) +
      "&dates=" + start + "/" + end +
      "&details=" + encodeURIComponent(details) +
      "&location=" + encodeURIComponent(location);
  }

  if (icsDownload) {
    const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aleksey Kristina Wedding//RU
BEGIN:VEVENT
UID:aleksey-kristina-20260821@example.com
DTSTAMP:20260821T100000Z
DTSTART:20260821T100000Z
DTEND:20260821T180000Z
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    icsDownload.href = URL.createObjectURL(blob);
  }
}

function setupRsvpModal() {
  const openBtn = document.getElementById("openRsvp");
  const closeBtn = document.getElementById("closeRsvp");
  const modal = document.getElementById("modal");
  const form = document.getElementById("rsvpForm");
  const ok = document.getElementById("ok");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }

  if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      surname: form.surname.value,
      guests: form.guests.value,
      phone: form.phone.value
    };

    try {
  await fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  });

  ok.style.display = "block";
  form.reset();
  alert("Не удалось отправить данные.");
  console.error(error);
}

    } catch (error) {
    }
  });
}
}

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar();
  updateCountdown();
  setupCalendarLinks();
  setupRsvpModal();

  setInterval(updateCountdown, 1000);
});
