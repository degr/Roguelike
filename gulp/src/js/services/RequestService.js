import $ from 'jquery';
import Profile from '../../../Profile';

function post(url, data){
	return $.ajax({
		url: 'server/' + url,
		type:"POST",
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		dataType: "json"
	});
}

export default class RequestService {

	constructor() {
		this.backEndUrl = Profile.backend;
		$.ajaxSetup({
			dataType: 'json'
		});
	}

	static sendRequest(url, data){
		let out = post(url, data);
		return out;
	}
	sendRequest(url, data) {
		let out = post(url, data);
		return out;
	}
}