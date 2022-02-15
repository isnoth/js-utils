
export function nativeExecuteScript(c){
    var h = document.createElement('script');
    h.src = `data:text/javascript;base64,${btoa(c)}`
    document.head.appendChild(h);
}

// input : variable
export function getNativeVariable (varibale){
    return new Promise((res, rej) => {

        nativeExecuteScript(`
            var data = { type: "FROM_PAGE", value: ${varibale}};
            window.postMessage(data, "*");
        `)

        function listener (event) {
            // We only accept messages from ourselves
            if (event.source != window)
                return;

            if (event.data.type && (event.data.type == "FROM_PAGE")) {
                window.removeEventListener("message", listener)
                // console.log("Content script received message: ", event.data.value);
                res( event.data.value)
            }
        }

        window.addEventListener("message", listener)
    });
  
}

// todo: input function
// todo: input promise

// getNativeVariable(`window.__PRELOADED_STATE__`)
// .then(console.log)
