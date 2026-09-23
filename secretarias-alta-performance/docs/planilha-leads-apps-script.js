/**
 * Recebe os leads do site e grava na planilha do Google.
 *
 * COMO INSTALAR (2 minutos):
 * 1. Abra a planilha → menu Extensões → Apps Script.
 * 2. Apague o que estiver no editor, cole este arquivo inteiro e salve (ícone de disquete).
 * 3. Clique em Implantar → Nova implantação → engrenagem "Selecionar tipo" → App da Web.
 *    - Executar como: Eu
 *    - Quem pode acessar: Qualquer pessoa
 *    Clique em Implantar, autorize com a conta da planilha e copie a "URL do app da Web"
 *    (termina em /exec). Envie essa URL para configurar no site.
 * 4. Se editar este código depois, faça Implantar → Gerenciar implantações → editar → Nova versão.
 */

var NOME_DA_ABA = "Leads";

var CABECALHOS = [
  "Data/hora", "Nome", "WhatsApp", "Origem no site", "Página",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var aba = ss.getSheetByName(NOME_DA_ABA) || ss.getSheets()[0];

    var d = {};
    try {
      d = JSON.parse(e.postData.contents);
    } catch (err) {
      d = (e && e.parameter) || {};
    }

    if (aba.getLastRow() === 0) {
      aba.appendRow(CABECALHOS);
      aba.getRange(1, 1, 1, CABECALHOS.length).setFontWeight("bold");
      aba.setFrozenRows(1);
    }

    var quando = d.date ? new Date(d.date) : new Date();
    aba.appendRow([
      quando, d.name || "", "", d.source || "", d.page || "",
      d.utm_source || "", d.utm_medium || "", d.utm_campaign || "", d.utm_content || "", d.utm_term || "", d.fbclid || "",
    ]);
    var linha = aba.getLastRow();
    aba.getRange(linha, 1).setNumberFormat("dd/MM/yyyy HH:mm");
    aba.getRange(linha, 3).setNumberFormat("@").setValue(d.phone || ""); // texto, para o + e o zero não sumirem

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Abrir a URL no navegador mostra "OK": serve para testar se a implantação está ativa.
function doGet() {
  return ContentService.createTextOutput("OK - webhook de leads ativo");
}
