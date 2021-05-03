import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  isConfirmed = false;

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    const uid = this.activeRoute.snapshot.queryParams.uid;
    const code = this.activeRoute.snapshot.queryParams.code;

    if (uid && code) {
      this.authService.confirm(uid, code)
        .subscribe(() => this.isConfirmed = true);
    }
  }

}
