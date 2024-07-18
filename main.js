let antrian = 3;
let antrianSpan = document.getElementById("antrian");
let audioAntrianNomor = document.getElementById("audio-antrian-nomor");
let audioAnnoucement = document.getElementById("audio-announcement")
let audioNumbers = {};

// Preload audio for numbers 0-9
for (let i = 0; i <= 9; i++) {
  audioNumbers[i] = new Audio(`audios/${i}.mp3`);
}

let audioDipersilahkan = new Audio("audios/dipersilahkan.mp3");

let isPlaying = false; // Flag untuk menandakan apakah sedang memutar suara angka

antrianSpan.textContent = antrian;

function tambahAntrian() {
  antrian++;
  antrianSpan.textContent = antrian;
  if (!isPlaying) {
    if (antrian < 10) {
      playNextSound(); // Panggil fungsi untuk memainkan suara berikutnya jika tidak ada yang sedang diputar
    } else {
      playTwoDigits();
    }
  }
}

function minusAntrian() {
  if (antrian > 0) {
    antrian--;
    antrianSpan.textContent = antrian;
    if (!isPlaying) {
        if (antrian < 10) {
          playNextSound(); // Panggil fungsi untuk memainkan suara berikutnya jika tidak ada yang sedang diputar
        } else {
          playTwoDigits();
        }
      }
  }
}

function playNextSound() {
  isPlaying = true;
  audioAntrianNomor.currentTime = 0; // Kembali ke awal audio untuk memastikan diputar dari awal
  audioAnnoucement.play();

  setTimeout(function() {
    audioAntrianNomor.play();
  }, 3000); 

  audioAntrianNomor.addEventListener("ended", function playNumber() {
    audioAntrianNomor.removeEventListener("ended", playNumber); // Hapus event listener setelah dipanggil sekali
    playNumberSound(antrian); // Panggil fungsi untuk memainkan suara angka setelah suara "antrian, nomor" selesai diputar
  });
}

function playNumberSound(num) {
  if (num >= 0 && num <= 9) {
    audioNumbers[num].play();
    audioNumbers[num].addEventListener("ended", function playEnd() {
      audioNumbers[num].removeEventListener("ended", playEnd); // Hapus event listener setelah dipanggil sekali
      isPlaying = false;
      if (antrian < 10) {
        playDipersilahkan();
      }
    });
  }
}

function playDipersilahkan() {
  audioDipersilahkan.play(); // Panggil fungsi untuk memainkan suara "dipersilahkan" setelah selesai suara angka
  audioDipersilahkan.addEventListener("ended", function endDipersilahkan() {
    audioDipersilahkan.removeEventListener("ended", endDipersilahkan); // Hapus event listener setelah dipanggil sekali
    if (antrian > 0) {
      antrianSpan.textContent = antrian;
    }
  });
}

function playTwoDigits() {
    let angkaPertama = Math.floor(antrian / 10);
    let angkaKedua = antrian % 10;

    audioAnnoucement.play();

    setTimeout(function() {
      audioAntrianNomor.play();
    }, 3000); 
    // audioAntrianNomor.play();
    audioAntrianNomor.addEventListener("ended", function playFirstNumber() {
      audioAntrianNomor.removeEventListener("ended", playFirstNumber); // Hapus event listener setelah dipanggil sekali
      playNumberSound(angkaPertama); // Memainkan suara angka pertama
  
      // Setelah suara angka pertama selesai, tunggu sebentar sebelum memainkan suara angka kedua
      setTimeout(function() {
        playNumberSound(angkaKedua); // Memainkan suara angka kedua setelah delay
      }, 1000); 
      setTimeout(function() {
        audioDipersilahkan.play()// Memainkan suara angka kedua setelah delay
      }, 1700);
    });
  }
  

function stopAudioAfterDelay(audioElement, delay) {
  setTimeout(function () {
    audioElement.pause();
    audioElement.currentTime = 0; // Mengatur ulang waktu audio ke awal untuk memastikan dihentikan sepenuhnya
  }, delay);
}
