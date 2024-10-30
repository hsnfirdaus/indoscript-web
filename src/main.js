import "./style.css";
import "./wasm_exec";
import monaco from "./monaco";

const go = new Go();
WebAssembly.instantiateStreaming(fetch("/main.wasm"), go.importObject).then(
  (result) => {
    go.run(result.instance);
  }
);

const editor = monaco.editor.create(document.getElementById("kode"), {
  value: `fungsi statusSaatIni(umur){

  jika ( umur >= 40 ) {
      balikan "Tua";
  } lain jika (umur >= 30) {
      balikan "Dewasa";
  } lain {
      balikan "Muda";
  }

}

fungsi ambilMasukan(label){
  var nama = masukan(label);

  jika (nama == ""){
      balikan ambilMasukan(label);
  }

  balikan nama;
}

var nama = ambilMasukan("Nama Anda: ");
var lahir = keBilangan(ambilMasukan("Tahun Lahir: "));
var sekarang = keBilangan(ambilMasukan("Tahun Saat Ini: "));

var umurSaya = sekarang - lahir;

cetakBr("===============");
cetakBr("Nama Saya:");
cetakBr(nama);
cetakBr("Umur Saya:");
cetakBr(umurSaya);
cetakBr("Status:");
cetakBr(statusSaatIni(umurSaya));`,
  language: "indoscript",
  theme: "vs-dark",
});

document.getElementById("jalankan").addEventListener("click", function () {
  document.getElementById("hasil").innerText = "";
  jalankanKode(editor.getValue(), function (teks) {
    document.getElementById("hasil").innerText += teks;
  });
});
