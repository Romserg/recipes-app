import { Component, DestroyRef, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  standalone: false
})

export class AuthComponent {
  destroyRef = inject(DestroyRef);
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      //...
    } else {
      this.authService.singUp(email, password)
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: (resData) => {
            console.log(resData);
            this.isLoading = false;
          },
          error: (errorMessage) => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
          }
        });
    }

    form.reset();
  }
}