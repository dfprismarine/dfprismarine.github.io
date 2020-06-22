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
    value: 'new codeLine("event", "Join")\n.playerAction("SendMessage", "The Website Works.")\n.build();',
    mode: 'javascript',
    theme: 'dracula'
  });

  function showCode()
  {
      var text = myCodeMirror.getValue();
      console.log("\n" + text + "\n ");
  }

  showCode();

  function json() {
    try {
      var a = eval(myCodeMirror.getValue());
      document.getElementById("codebox").value = a.json;
    } catch (e) {
      alert(e); 
    }
  }

  function encode() {
    try {
      var a = eval(myCodeMirror.getValue());
      document.getElementById("codebox").value = a.encoded;
    } catch (e) {
      alert(e); 
    }
  }


  function giveCommand() {
      try {
        var a = eval(myCodeMirror.getValue());
        document.getElementById("codebox").value = a.give;
      } catch (e) {
        alert(e); 
      }
    }

  function copy() { alert("Coming soon.") }