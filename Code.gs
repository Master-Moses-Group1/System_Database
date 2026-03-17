function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Check the Spreadsheet for User Login
function checkLogin(email, password) {
  // Replace with your actual Google Sheet ID
  const ss = SpreadsheetApp.openById("1JNaDjkKvG9B22aZTA-jQz-6ynOa82_6oLdkPN0L5vzEE"); 
  const sheet = ss.getSheetByName("Users");
  const data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === email && data[i][1] === password) {
      return {
        status: "success",
        name: data[i][2],    // Full Name
        photo: data[i][3],   // Photo URL
        allowed: data[i][4]  // List of buttons (e.g., "Plantilla,Summary")
      };
    }
  }
  return { status: "fail" };
}

// Gets the HTML content of the 15 different pages
function getPage(pageName) {
  return HtmlService.createHtmlOutputFromFile(pageName).getContent();
}