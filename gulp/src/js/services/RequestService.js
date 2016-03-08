import $ from 'jquery';
import Profile from '../../../Profile';

export default class RequestService {

	constructor() {
		this.backEndUrl = Profile.backend;
		$.ajaxSetup({
			dataType: 'json',
			contentType: "application/json; charset=utf-8"
		});
	}

	static post(url, data){
		return $.ajax({
			url: 'server/' + url,
			type:"POST",
			data: JSON.stringify(data)
		});
	}
	post(url, data) {
		return RequestService.post(url, data);
	}
	static put(url, id, data){
		return $.ajax({
			url: 'server/' + url + '/' + id,
			type:"put",
			data: JSON.stringify(data)
		});
	}
	put(url, id, data) {
		return RequestService.put(url, id, data);
	}
	static get(url, data){
		if(typeof data === 'string') {
			url = url.replace(/\?$/, '') + "?" + encodeURIComponent(data);
		} else if(typeof data === 'object') {
			url = url.replace(/\?$/, '') + "?";
			let str = [];
			for(let key in data) {
				if(data.hasOwnProperty(key)) {
					str.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
				}
			}
			url += str.join('&');
		}
		return $.ajax({
			url: 'server/' + url,
			type:"get"
		});
	}
	get(url, data) {
		return RequestService.get(url, data);
	}

	static del(url, id){
		return $.ajax({
			url: 'server/' + url + '/' + id,
			type:"delete"
		});
	}
	del(url, id) {
		return RequestService.del(url, id);
	}
}