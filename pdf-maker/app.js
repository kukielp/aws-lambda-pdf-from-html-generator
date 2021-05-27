const chromium = require("chrome-aws-lambda")

exports.generate_pdf = async (event, context) => {

  const buffer = Buffer.from(event.body, "base64")
  const eventBody = buffer.toString('UTF-8')
  const body = JSON.parse(eventBody)
  // finally
  const html = body.html
  const options = {
    format: "A4",
    margin: { top: ".5in", right: ".5in", bottom: ".5in", left: ".5in" },
  };

  const pdf = await getPDF(html, options)
  if(pdf.success){
    return {
      headers: {
        "Content-type": "application/pdf",
      },
      statusCode: 200,
      body: pdf.data.toString("base64"),
      isBase64Encoded: true,
    }

  }else{
    return {
      headers: {
        "Content-type": "application/json",
      },
      statusCode: 500,
      body: pdf.error,
      isBase64Encoded: false,
    }
  }
  
}

/// https://github.com/alixaxel/chrome-aws-lambda
getPDF = async (html, options) => {
  let result, browser
  try {
    const executablePath =  await chromium.executablePath
    browser  = await chromium.puppeteer.launch({ args: chromium.args, executablePath })
    let page = await browser.newPage()
    const loaded = page.waitForNavigation({ waitUntil: "load" })
    await page.setContent(html)
    await loaded
    const pdf = await page.pdf(options)
    result = { data: pdf, success: true, error: null }
  } catch (error) {
      result = { data: null, success: false, error: error }
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
  return result
}