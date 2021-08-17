import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EnvService } from './services/env.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private environment: EnvService){}
  title = 'nfb-ecommerce';
  backEndBaseUrl = this.environment.backEndBaseUrl; 
}
