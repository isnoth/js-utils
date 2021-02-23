export function uniqueArray (currentData, newData, comparator) {
    return [...currentData, ...newData.filter(i=> 
        !currentData.reduce((acc, cur) => {
            return  acc || comparator(cur, i)
        }, false)
    )]
}

export function uniqObjArrByKey (currentData, key) {
    return currentData.reduce((acc, cur) => {
        return !!acc.find(i => i[key]===cur[key]) ? acc : [...acc, cur]
    }, [])
}

export const timeoutAsync = (timeout) => (new Promise((res) => setTimeout(res, timeout)))
export const timeoutAsyncRej = (timeout) => (new Promise((res, rej) => setTimeout(() => rej(new Error(`timeoutAsyncRej timeout:${timeout}`)), timeout)))

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function uid() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    //return '_' + Math.random().toString(36).substr(2, 9);
}

export class SimpleEventHandler{
    handler: any;
    constructor() {
        this.handler = {}
    }

    addEventListener(evtName, fn) {
        const id = uuidv4()
        this.handler[evtName] = [...this.handler[evtName] || [], { id, fn}]
        return { unwatch: () => {
            const index = this.handler[evtName].findIndex(i => i.id === id)
                this.handler[evtName].splice(index, 1)
            }
        }
    }

    notify(name, value) {
        const evtHandlers = this.handler[name] || []
        evtHandlers.forEach(handler => handler.fn(value))
    }
}

export function extractJSON(str) {
    const firstOpen = str.indexOf('{')
    const sliced = str.slice(firstOpen)
    // console.log(sliced)
    let i = 0
    let j = 0

    for (let s of sliced) {
        j ++;
        if (s === '{' ) {
            i ++;
        } else if (s === '}') {
            i --;
        }

        if (i === 0) {
            const os = sliced.slice(0, j)
            return JSON.parse(os)
        }
    }
}

export function extractJSONV2(str: string): any {
    var firstOpen = -1, firstClose, candidate;
    firstOpen = str.indexOf('{', firstOpen + 1);
    do {
        firstClose = str.lastIndexOf('}');
        // console.log('firstOpen: ' + firstOpen, 'firstClose: ' + firstClose);
        if(firstClose <= firstOpen) {
            return null;
        }
        do {
            candidate = str.substring(firstOpen, firstClose + 1);
            // console.log('candidate: ' + candidate);
            try {
                var res = JSON.parse(candidate);
                // console.log('...found');
                return [res, firstOpen, firstClose + 1];
            }
            catch(e) {
                // console.log('...failed');
            }
            firstClose = str.substr(0, firstClose).lastIndexOf('}');
        } while(firstClose > firstOpen);
        firstOpen = str.indexOf('{', firstOpen + 1);
    } while(firstOpen != -1);
}
