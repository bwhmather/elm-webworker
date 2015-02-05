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
    var incoming = NS.input({ctor: 'Waiting'});
    var w = new Worker(url);

    w.onmessage = function(event) {
      localRuntime.notify(incoming.id, {ctor: 'Message', _0: event.data});
    };

    w.onerror = function(event) {
      localRuntime.notify(incoming.id, {ctor: 'Error', _0: event.message});
    };

    function postMessage(msg) {
      w.postMessage(msg);
    };

    function take1(x,y) { return x }
    return A3(
        Signal.map2, F2(take1),
        incoming,
        A2(Signal.map, postMessage, outgoing)
    );
  }
  return localRuntime.Native.WebWorker.values = { spawn: F2(spawn) };
};
