import { inject, Injectable, signal, Signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class LanguageService {
	private translate = inject(TranslateService);

	private currentLangSignal = signal<string>('en');
	public currentLanguage: Signal<string> = this.currentLangSignal.asReadonly();

	// ⚡ NEUES SIGNAL: Zeigt an, ob die aktuelle Sprache geladen ist
	private isLoadingSignal = signal<boolean>(false);
	public isLoading: Signal<boolean> = this.isLoadingSignal.asReadonly();

	constructor() {
		// ... Initialisierungslogik bleibt gleich
		const storedLang = localStorage.getItem('language') || 'en';
		this.translate.setDefaultLang('en');
		this.useLanguage(storedLang);
	}

	useLanguage(language: string): void {
		if (this.currentLangSignal() === language) return;

		this.isLoadingSignal.set(true); // Laden gestartet

		// 1. Sprache umschalten
		this.translate.use(language).pipe(first()).subscribe({
			next: () => {
				// 2. Warten, bis das Laden abgeschlossen ist
				this.currentLangSignal.set(language);
				localStorage.setItem('language', language);
				this.isLoadingSignal.set(false); // Laden abgeschlossen

				// ⚡ OPTIONALER ZUSÄTZLICHER FIX: Manuelle CD-Triggerung
				// Wenn das Problem sehr hartnäckig ist, kann hier eine manuelle CD 
				// für die Hauptkomponente (Header/Root) helfen, den Zustand zu stabilisieren, 
				// nachdem die Übersetzung fertig ist. (Aber zuerst ohne versuchen)
			},
			error: (err) => {
				console.error('Fehler beim Laden der Übersetzungsdatei:', err);
				this.isLoadingSignal.set(false); // Laden fehlgeschlagen
				// Hier könnte man zur Fallback-Sprache zurückkehren
			}
		});
	}
}