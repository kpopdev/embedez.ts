
export class Utils {
  checkForSocialMediaContent(input: string): boolean {
    const regex = /(tiktok|instagram|twitter|x\.com|reddit|ifunny|youtu\w*)/g;
    const check = input.match(regex);
    return check !== null;
  }
}