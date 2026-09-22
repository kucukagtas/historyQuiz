function Soru(soruMetni, cevapSecenekleri, dogruCevap, aciklama = "") {
  this.soruMetni = soruMetni;
  this.cevapSecenekleri = cevapSecenekleri;
  this.dogruCevap = dogruCevap;
  this.aciklama = aciklama;
}

Soru.prototype.cevabiKontrolEt = function (cevap) {
  return cevap === this.dogruCevap;
};

//console.log(soruListesi[0].cevabiKontrolEt("a"));
