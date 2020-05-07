import { timeoutAsync }  from './common.js'

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
			clearTimeout(timeoutTimer)
			timeoutTimer = null
			findEl && resolve(findEl)
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


