import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  destroyRef = inject(DestroyRef)

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.user
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      })
    // this.onFetchData();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
