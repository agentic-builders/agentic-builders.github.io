// vCard 3.0 text values escape delimiters; content lines use CRLF and folding.
export function vcardText(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
}

export function serializeVcard(value) {
  const lines = String(value).replace(/\r\n|\r/g, "\n").trimEnd().split("\n");
  return lines.map((line) => {
    let folded = "";
    let octets = 0;
    for (const character of line) {
      const size = Buffer.byteLength(character, "utf8");
      if (octets + size > 75) {
        folded += "\r\n ";
        octets = 1;
      }
      folded += character;
      octets += size;
    }
    return folded;
  }).join("\r\n") + "\r\n";
}
