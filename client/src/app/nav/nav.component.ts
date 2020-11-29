import { Component, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../_modules/user';
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

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe(response => {
    }, error => {
        console.log(error);
    })
  }
  logout() {
    this.accountService.logout();
  }
 
}
