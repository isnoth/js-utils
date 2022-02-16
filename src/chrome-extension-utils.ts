//
// check https://stackoverflow.com/questions/3955803/chrome-extension-get-page-variables-in-content-script
//
export class ExtractPageVariable {
    _variableName: any;
    _handShake: any;
    _data: any;

  constructor(variableName) {
    this._variableName = variableName;
    this._handShake = this._generateHandshake();
    this._inject();
    this._data = this._listen();
  }

  //@ts-ignore
  get data() {
    return this._data;
  }

  // Private

  _generateHandshake() {
    const array = new Uint32Array(5);
    return window.crypto.getRandomValues(array).toString();
  }

  _inject() {
    function propagateVariable(handShake, variableName) {
      const message = { handShake };
      message[variableName] = window[variableName];
      window.postMessage(message, "*");
    }

    const script = `( ${propagateVariable.toString()} )('${this._handShake}', '${this._variableName}');`
    const scriptTag = document.createElement('script');
    const scriptBody = document.createTextNode(script);

    scriptTag.id = 'chromeExtensionDataPropagator';
    scriptTag.appendChild(scriptBody);
    document.body.append(scriptTag);
  }

  _listen() {
    return new Promise(resolve => {
      window.addEventListener("message", ({data}) => {
        // We only accept messages from ourselves
        if (data.handShake != this._handShake) return;
        resolve(data);
      }, false);
    })
  }
}

// const windowData = new ExtractPageVariable('__PRELOADED_STATE__').data;
// windowData.then(console.log);
// windowData.then(data => {
//    // Do work here
// });
