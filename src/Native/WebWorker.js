Elm.Native.WebWorker = {};
Elm.Native.WebWorker.make = function(localRuntime) {
  localRuntime.Native = localRuntime.Native || {};
  localRuntime.Native.WebWorker = localRuntime.Native.WebWorker || {};
  if (localRuntime.Native.WebWorker.values)
  {
    return localRuntime.Native.WebWorker.values;
  }

  var Signal = Elm.Signal.make(localRuntime);
  var NS = Elm.Native.Signal.make(localRuntime);
  var List = Elm.Native.List.make(localRuntime);

  function spawn(url, outgoing) {
    var incoming = NS.input("");
    var w = new Worker(url);

    w.onmessage = function(event) {
      localRuntime.notify(incoming.id, event.data);
    };

    function postMessage(msg) {
      w.postMessage(msg)
    }

    function take1(x,y) { return x }
    return A3(
        Signal.map2, F2(take1),
        incoming,
        A2(Signal.map, postMessage, outgoing)
    );
  }
  return localRuntime.Native.WebWorker.values = { spawn: F2(spawn) };
};
