import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `
        <main class="container">
            <router-outlet />
        </main>
    `,
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent {}
