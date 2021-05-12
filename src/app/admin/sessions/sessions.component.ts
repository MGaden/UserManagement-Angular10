import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, switchMap } from 'rxjs/operators';
import { AdminService } from '../admin.service';

@Component({
  selector: 'sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  public sessionsD = new MatTableDataSource();
  
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadSessions$().subscribe();
  }

  loadSessions$() {
    return this.adminService.getActiveSessions()
      .pipe(map(data => this.sessionsD.data = data));
  }

  confirmDelete(sessionId: string) {
    this.adminService.destroySession(sessionId)
      .pipe(switchMap(() => this.loadSessions$()))
      .subscribe();
  }

}
