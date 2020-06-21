/*CodeMirror(document.querySelector('#CodeMirrorr'), {
    lineNumbers: true,
    tabSize: 2,
    value: 'console.log("Hello, World");',
    mode: 'javascript',
    theme: 'dracula'
  });
*/
  var myCodeMirror = CodeMirror(document.body, {
    lineNumbers: true,
    tabSize: 2,
    value: 'console.log("Hello, World");',
    mode: 'javascript',
    theme: 'dracula'
  });

  function showCode()
  {
      var text = myCodeMirror.getValue();
      console.log("\n" + text + "\n ");
  }

  showCode();