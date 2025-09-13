import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any[] = [];

  constructor(public api: ApiService, public auth: AuthService) {}

  ngOnInit() {
    this.api.getServices().subscribe({
      next: (data) => (this.services = data),
      error: (err) => console.error('Failed to fetch services:', err)
    });
  }

  purchase(service: any) {
    if (!this.auth.user) return;
    this.api.purchaseService(service._id, this.auth.user.id).subscribe({
      next: (res) => alert(`Purchased! Remaining tokens: ${res.remainingTokens}`),
      error: (err) => console.error(err)
    });
  }
}
