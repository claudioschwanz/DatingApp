import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}
  currentUser$!: Observable<User>;

  title = 'The Dating App';

  loggedIn: boolean = false;

  constructor(public accountService: AccountService, private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/');
    });
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
 
}
