import { timeoutAsync, uid }  from './common'

export function downFile(content, filename) {
	// 创建隐藏的可下载链接
	var eleLink = document.createElement('a');
	eleLink.download = filename;
	eleLink.style.display = 'none';
	// 字符内容转变成blob地址
	var blob = new Blob([content]);
	eleLink.href = URL.createObjectURL(blob);
	// 触发点击
	document.body.appendChild(eleLink);
	eleLink.click();
	// 然后移除
	document.body.removeChild(eleLink);
};

export function waitUntilElementExist(selectors, xpaths=[], timeout=10000){
	return new Promise((res, rej) => {
		let timer;
		let timeoutTimer;

		function resolve(el){
			clearInterval(timer);
			timer = null;
			res(el)
		}

		timeoutTimer = setTimeout(() => {
			clearInterval(timer)
			timer = null;
			rej(new Error('wait until element exist timeout!'))
		}, timeout)

		timer = setInterval(()=> {
			const searchEls = selectors.map(selector => document.querySelector(selector))
			const xpathSearchEls = xpaths.map(xpath => document.evaluate(xpath, document).iterateNext())
			const findEl = [...searchEls, ...xpathSearchEls].find(i=> i!== null)
            if (findEl) {
                clearTimeout(timeoutTimer)
                timeoutTimer = null
                resolve(findEl)
            }
		}, 1000)
	})
}

export function scrollAndExecute({
    scrollContainer,
    scrollHeight=1000,
    scrollInterval=2000,
    fn,
    scrollTimeout=10000,
    scrollStopFn=null,
}) {
    let interval;
    const callFnEveryIntervalAsync = () => {
        return new Promise((resolve, reject) => {
            interval = setInterval(() => {
                fn()
                scrollContainer.scroll(0, scrollContainer.scrollTop+scrollHeight)
                if(scrollStopFn && scrollStopFn()){
                    resolve()
                }
            }, scrollInterval)
        })  
    } 

    return Promise.race([callFnEveryIntervalAsync(), timeoutAsync(scrollTimeout)])
        .then(() => {
            clearInterval(interval)
        })
}

/*
usage :
scrollAndExecute( {scrollContainer, fn: getAndConcatData, scrollHeight: 200, scrollTimeout:30000, scrollInterval:500})
    .then(() => {
        console.log(lData)
    })
    */

export function loadScript(url, callback)
{
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   // @ts-ignore
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
}

export function openNewTab(url: string)  {
    const win = window.open(url,'_blank');
    if(win) {
        window.focus();
    }
    else{
        setTimeout( () => {
            if(win) win.focus()
        }, 100 );
    }
}

function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}

export function getUidFromLocalStorage() {
    const id = window.localStorage.getItem('jsuuid')
    if (id) {
        return id
    } else {
       const newUid = uid()
       window.localStorage.setItem('jsuuid', newUid)
       return newUid
    }
}
