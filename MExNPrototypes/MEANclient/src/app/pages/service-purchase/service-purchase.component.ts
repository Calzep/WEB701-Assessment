import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-purchase',
  imports: [CommonModule],
  templateUrl: './service-purchase.component.html',
  styleUrls: ['./service-purchase.component.css']
})
export class ServicePurchaseComponent implements OnInit {
  purchases: any[] = [];

  async ngOnInit() {
    await this.fetchPurchases();
    console.log(this.purchases)
  }

  async fetchPurchases() {
    try {
      const res = await fetch('http://localhost:7011/api/service-purchases', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.purchases = await res.json();
    } catch (err) {
      console.error('Failed to fetch purchases:', err);
    }
  }

  async approvePurchase(id: string) {
    try {
      const res = await fetch(`http://localhost:7011/api/service-purchase/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: 'approved' })
      });
      if (res.ok) {
        await this.fetchPurchases(); // refresh list
      }
    } catch (err) {
      console.error('Failed to approve purchase:', err);
    }
  }
}
