class Utils {
    static decodeHtmlEntities(str) {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    }
}

export default Utils;