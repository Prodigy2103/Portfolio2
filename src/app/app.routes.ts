import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';

// Die Imports für Imprint und Privacy hier oben ENTFERNEN!

export const routes: Routes = [
    { 
        path: '', 
        component: MainContentComponent 
    },
    { 
        path: 'imprint', 
        loadComponent: () => import('./imprint/imprint.component').then(m => m.ImprintComponent)
    },
    { 
        path: 'privacy', 
        loadComponent: () => import('./privacy/privacy.component').then(m => m.PrivacyComponent)
    },
];