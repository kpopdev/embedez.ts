export type ExtractParams<T extends string> =
  T extends `${infer Prefix}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : T extends `${infer Prefix}:${infer Param}`
    ? { [K in Param]: string }
    : {};

export class Utils {
  checkForSocialMediaContent(input: string): boolean {
    const regex = /(tiktok|instagram|twitter|x\.com|snapchat|reddit|ifunny|youtu\w*|imgur|bsky)/gi;
    const check = input.match(regex);
    return check !== null;
  }

  extractIdFromUrl<Pattern extends string>(
    pattern: Pattern,
    url: string
  ): ExtractParams<Pattern> | {} {
    const paramNames = pattern.match(/:[a-zA-Z0-9_]+/g) || [];
    const regexPattern = pattern.replace(
      /:[a-zA-Z0-9_]+/g,
      "([.a-zA-Z0-9_-]+)"
    );

    const regex = new RegExp(regexPattern);
    const match = url.match(regex);

    if (match) {
      const extractedValues = match.slice(1);

      if (extractedValues.length !== paramNames.length) {
        throw new Error(
          "Mismatch in the number of extracted values and placeholders."
        );
      }

      const result = {} as any;
      paramNames.forEach((paramName: string, index: number) => {
        const paramNameKey = paramName.slice(1) as keyof ExtractParams<Pattern>;
        const extractedValue = extractedValues[index];
        result[paramNameKey] = extractedValue;
      });

      return result as ExtractParams<Pattern>;
    }

    return {};
  }

  extractKeysFromUrlTemplate(urlTemplate: string): string[] {
    const keyRegex = /{([^{}]+)}/g;
    const matches = urlTemplate.match(keyRegex);
    const result = matches ? matches.map((match) => match.slice(1, -1)) : [];
    return result;
  }

  replaceKeysWithValues(
    urlTemplate: string,
    extractedIds: Record<string, string>
  ): string {
    return urlTemplate.replace(
      /\{([^{}]+)\}/g,
      (match, key) => extractedIds[key] || match
    );
  }
}
