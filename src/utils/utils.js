class Utils {
    static decodeHtmlEntities(str) {
    return str
        .replace(/&#039;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&euml;/g, 'ë')
        .replace(/&aacute;/g, 'á')
        .replace(/&eacute;/g, 'é')
        .replace(/&ntilde;/g, 'ñ')
        .replace(/&auml;/g, 'ä')
        .replace(/&ouml;/g, 'ö')
        .replace(/&uuml;/g, 'ü')
        .replace(/&hellip;/g, '...');
    }
}

export default Utils;