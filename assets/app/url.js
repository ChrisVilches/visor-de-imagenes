import Path from 'path';

export default class Url {

	static get host(){
		return window.location.host;
	}

	static get spaUrl(){
		return '/spa';
	}

	static get mangaSpaUrl(){
		return Path.join(this.spaUrl, '/manga');
	}

	static get mangaServiceUrl(){
		return '/manga';
	}

	// spa/manga/manga_name/path ---> /manga_name/path
	static mangaUrlClean(url){
		if(url.search(this.mangaSpaUrl) == 0){
			return url.replace(this.mangaSpaUrl, '');
		}
		return url;
	}

	static getFileName(url){
		var pos = url.lastIndexOf('/');
		if(pos == -1)
			return '';
		if(pos + 1 >= url.length)
			return '';
		return url.substr(pos + 1);
	}

	static removeLast(url){
		return url.substr(0, url.lastIndexOf('/'));
	}

}


console.assert(Url.host == 'localhost:1337');
console.assert(Url.spaUrl == '/spa');
console.assert(Url.mangaSpaUrl == '/spa/manga');
console.assert(Path.join(Url.mangaSpaUrl, 'naruto') == '/spa/manga/naruto');

console.assert(Url.getFileName('/aa/bb/cc') == 'cc');
console.assert(Url.getFileName('/aa/bb/cc/dd') == 'dd');
console.assert(Url.getFileName('/aa/bb/cc/img.jpg') == 'img.jpg');
console.assert(Url.getFileName('/aa/bb') == 'bb');
console.assert(Url.getFileName('/aa') == 'aa');
console.assert(Url.getFileName('/') == '');
console.assert(Url.getFileName('A') == '');

console.assert(Url.removeLast('/aa/bb/cc/dd') == '/aa/bb/cc');
console.assert(Url.removeLast('/aa/bb/cc') == '/aa/bb');
console.assert(Url.removeLast('/aa/bb') == '/aa');
console.assert(Url.removeLast('/aa') == '');

