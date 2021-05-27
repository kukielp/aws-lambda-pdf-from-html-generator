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

  const pdf = await getPDF(html, options);

  return {
    headers: {
      "Content-type": "application/pdf",
    },
    statusCode: 200,
    body: pdf.toString("base64"),
    isBase64Encoded: true,
  };
}

/// https://github.com/alixaxel/chrome-aws-lambda
getPDF = async (html, options) => {
  const executablePath =  await chromium.executablePath
  const browser  = await chromium.puppeteer.launch({ args: chromium.args, executablePath })
  const page = await browser.newPage()
  const loaded = page.waitForNavigation({ waitUntil: "load" })
  await page.setContent(html)
  await loaded
  const result = await page.pdf(options)
  await browser.close()
  return result
}