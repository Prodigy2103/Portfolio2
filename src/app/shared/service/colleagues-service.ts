import { Injectable } from '@angular/core';
import { colleaguesOne } from '../interface/colleagues-interface';

@Injectable({
	providedIn: 'root'
})
export class colleaguesService {

	constructor() { }

	colleagues: colleaguesOne[] = [
		{
			id: 1,
			name: "Marco E.",
			person: 'colleagues.person1',
			position: "Frontend Developer",
			link: '',
			logo: false,
		},
		{
			id: 2,
			name: "Uwe R.",
			person: 'colleagues.person2',
			position: "Platzwart FSV Oschatz",
			link: '',
			logo: false,
		},
		{
			id: 3,
			name: "Felicia T.",
			person: 'colleagues.person3',
			position: "Frontend Developer",
			link: 'https://www.linkedin.com/in/felicia-primadita-tretter/',
			logo: true,
		}
	]
}