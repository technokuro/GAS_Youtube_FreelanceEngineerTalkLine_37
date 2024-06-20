const DOC_ID = '15AAE4Xf7L7n3FKeWCNl_azEIjizrRclIn6Kx0XvjVMw';
const SHEET_NAME = 'お題';
const DEFAULT_RANGE_HEADER = 'A1:B';

function test() {
  const result = doGet({
    parameter: {
      num: 5
    }
  });

  console.log(JSON.stringify(result));
}

function doGet(e) {
  const p = e.parameter;

  const num = p?.num || 1;

  const doc = SpreadsheetApp.openById(DOC_ID);
  const odaiSheet = doc.getSheetByName(SHEET_NAME);
  const range = odaiSheet.getRange(`${DEFAULT_RANGE_HEADER}${odaiSheet.getLastRow()}`);
  const dataValues = range.getValues();

  if (p?.newQuestion) {
    const lastRow = odaiSheet.getLastRow();
    odaiSheet.getRange(lastRow + 1, 1).setValue(lastRow);
    odaiSheet.getRange(lastRow + 1, 2).setValue(p?.newQuestion);
  }

  return createHtmlOutput('くえすちょん', 'question.html', {
    data: dataValues[num][1],
  });
}


function createHtmlOutput(title, fileName, param) {
  const file = HtmlService.createTemplateFromFile(fileName);
  file.param = param;
  const next = file.evaluate();
  next.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  next.setTitle(title);

  return next;

}
