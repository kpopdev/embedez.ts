

import { EmbedEZ } from "./src/index"

EmbedEZ.setConfig({
  apiKey: process.env.EZ_APIKEY,
  url: "https://embedez.com"
})

async function test(message: string) {
  // Check if the message contains social media content
  const isValid = EmbedEZ.utils.checkForSocialMediaContent(message);
  console.log("isValid:", isValid);

  // Get the search key from the message
  const searchKeyResponse = await EmbedEZ.getSearchKey(message);
  console.log("searchKey:", searchKeyResponse);

  if (searchKeyResponse.success) {
    // Get the media preview using the retrieved search key
    const preview = await EmbedEZ.getPreview(searchKeyResponse.data.key);
    console.log("preview:", preview);
  }
}

// Example usage
const message = "hello yall look at this tiktok video https://www.tiktok.com/@truth.filmz/video/7355123993017421089";
test(message);