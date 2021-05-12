import { Component } from '@angular/core';
import { IdleService } from './core/userIdle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    public idleService : IdleService
  ) {

  }

  ngOnInit(): void {
    this.idleService.intiateIdleTimeout();
  }
  
}
