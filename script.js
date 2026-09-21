/* =========================================
   BUKA UNDANGAN
========================================= */

const openButton = document.getElementById("openInvitation");
const cover = document.getElementById("cover");
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

document.body.classList.add("locked");

openButton.addEventListener("click", function () {
  cover.style.opacity = "0";
  cover.style.transition = "opacity 0.8s ease";

  setTimeout(function () {
    cover.style.display = "none";

    document.body.classList.remove("locked");
  }, 800);

  music
    .play()
    .then(function () {
      musicButton.classList.add("playing");
    })
    .catch(function () {
      console.log("Musik membutuhkan interaksi pengguna.");
    });
});

/* =========================================
   MUSIK
========================================= */

musicButton.addEventListener("click", function () {
  if (music.paused) {
    music.play();

    musicButton.classList.add("playing");
  } else {
    music.pause();

    musicButton.classList.remove("playing");
  }
});

/* =========================================
   COUNTDOWN
========================================= */

/*
   Ubah tanggal di bawah jika tanggal pernikahan
   berbeda.

   Format:
   "Bulan Tanggal, Tahun Jam:Menit:Detik"
*/

const weddingDate = new Date("December 20, 2026 08:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();

  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(days).padStart(2, "0");

  document.getElementById("hours").innerText = String(hours).padStart(2, "0");

  document.getElementById("minutes").innerText = String(minutes).padStart(
    2,
    "0",
  );

  document.getElementById("seconds").innerText = String(seconds).padStart(
    2,
    "0",
  );
}

updateCountdown();

setInterval(updateCountdown, 1000);

/* =========================================
   COPY NOMOR REKENING
========================================= */

const copyButtons = document.querySelectorAll(".copy-button");

copyButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const account = button.getAttribute("data-account");

    navigator.clipboard.writeText(account).then(function () {
      const originalText = button.innerText;

      button.innerText = "✓ Berhasil Disalin";

      setTimeout(function () {
        button.innerText = originalText;
      }, 2000);
    });
  });
});

/* =========================================
   RSVP
========================================= */

const rsvpForm = document.getElementById("rsvpForm");

const rsvpResult = document.getElementById("rsvpResult");

rsvpForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;

  const attendance = document.getElementById("attendance").value;

  const message = document.getElementById("messageInput").value;

  rsvpResult.innerHTML = `
        <p>
            Terima kasih, <strong>${name}</strong>! 💕
        </p>

        <p>
            Konfirmasi kehadiran:
            <strong>${attendance}</strong>
        </p>

        <p>
            Ucapan:
            "${message}"
        </p>
    `;

  rsvpForm.reset();
});
