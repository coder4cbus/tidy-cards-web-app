import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLSearchParams  } from '@angular/http';
import { TcDataLimit } from '../tc-shared/tc-data-limit';
import { TcUserService } from '../tc-user/tc-user.service';
import { TcUser } from '../tc-user/tc-user.class';

@Component({
    templateUrl: './tc-admin-users.component.html'
})

export class TcAdminUsersComponent implements OnInit {

    public pageNb: number;
    public haveMoreUsers: boolean;
    public loadingUsers: boolean;
    public users: TcUser[];
    public userIdDeactivate: string;
    public userIdActivate: string;

    constructor( private router: Router, private userService: TcUserService) {
    }

    collapse(user) {
      user.isCollapsed = !user.isCollapsed;
    }

    ngOnInit() {
        this.pageNb = 0;
        this.loadingUsers = false;
        this.haveMoreUsers = true;
        this.users = [];
        this.loadUsers();
    }

    loadNextPage() {
        if (this.haveMoreUsers) {
            this.pageNb++;
            this.loadUsers();
        }else {
            console.log('no more users');
        }
    }

    deactivateAccount() {
        const params = new URLSearchParams();
        this.userService.putDeactivate(this.userIdDeactivate).subscribe(result => {
            console.log(result);
        }, () => {});
    }

    activateAccount() {
        const params = new URLSearchParams();
        this.userService.putActivate(this.userIdActivate).subscribe(result => {
            console.log(result);
        }, () => {});
    }

    loadUsers() {
        this.loadingUsers = true;
        const params = new URLSearchParams();
        params.set('limit', TcDataLimit.COLLECTION.toString());
        params.set('skip', (TcDataLimit.COLLECTION * this.pageNb).toString());
        params.set('populate', '_avatar');
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        params.set('allStates', 'true');
        this.userService.getUsers(params).subscribe(users => {
            this.onUsersReceived(users);
        }, () => {});
    }

    onUsersReceived(users) {
        for (const i in users) {
            users[i].isCollapsed = false;
            this.users.push(users[i]);
        }
        this.haveMoreUsers = (users.length === TcDataLimit.COLLECTION);
        this.loadingUsers = false;
    }
}
