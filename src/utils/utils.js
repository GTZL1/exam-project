class Utils {
    static decodeHtmlEntities(str) {
    return str
        .replace(/&#039;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&euml;/g, 'ë');
    }
}

export default Utils;