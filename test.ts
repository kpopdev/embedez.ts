

import { EmbedEZ } from "./src/index"

EmbedEZ.setConfig({
  apiKey: process.env.EZ_APIKEY,
  url: "https://embedez.com"
})

const message = "hello yall look at this tiktok video https://www.tiktok.com/@truth.filmz/video/7355123993017421089"

async function Test(input: string) {
  const isValid = EmbedEZ.utils.checkForSocialMediaContent(message)
  console.log("TEST: isValid", isValid)  
  
  const searchKey = await EmbedEZ.getSearchKey(message)
  console.log("TEST: searchKey", searchKey)

  if (searchKey.success) {
    const preview = await EmbedEZ.getPreview(searchKey.data.key)
    console.log("TEST: preview", preview)
  }
}

Test("https://www.tiktok.com/@truth.filmz/video/7355123993017421089")
