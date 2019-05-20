const puppeteer = require('puppeteer');

function delay(time) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time)
   });
}

let urls = [
	'https://www.mitlinq.org/',
	'https://www.jcwtaxaccounting.com/'
];

let names = [
	'mitlinq',
	'jcwtaxaccounting'
];


(async () => {
	const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
	await Promise.all(urls.map((u, i) => {
		return (async () => {
			try {
				const page = await browser.newPage();
				await page.goto(u, {waitUntil: 'networkidle0'});
				await delay(10000);
				await page.setViewport({width: 1382, height: 784});
				await page.screenshot({path: `${__dirname}/src/img/site_screenshots/${names[i]}.jpg`, fullPage: true});
			} catch(err) {console.log(err)}
		})();
	}));
	browser.close();
})();





