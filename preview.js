function preview() {
    try {
        var a = eval(myCodeMirror.getValue());
        url = "https://derpystuff.gitlab.io/code/?template=" + a.encoded;
        window.open(url);
    } catch (e) {
        alert(e);
    }
}