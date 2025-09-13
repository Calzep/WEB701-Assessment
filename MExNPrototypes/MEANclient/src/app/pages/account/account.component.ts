import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  balance: number = 0;

  constructor(public auth: AuthService) {}

  async ngOnInit() {
    await this.fetchUser();
  }

  async fetchUser() {
    if (!this.auth.user) return;
    try {
      const res = await fetch(`http://localhost:7011/api/user/${this.auth.user.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        this.balance = data.tokens;
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  }

  async addTokens() {
    try {
      const res = await fetch(`http://localhost:7011/api/user/add-tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount: 10 })
      });
      const data = await res.json();
      if (res.ok) {
        this.balance = data.tokens;
      }
    } catch (err) {
      console.error('Failed to add tokens:', err);
    }
  }
}
