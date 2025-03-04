import { Component, DestroyRef, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html"
})

export class AuthComponent {
  destroyRef = inject(DestroyRef);
  isLoginMode = true;

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

    if (this.isLoginMode) {
      //...
    } else {
      this.authService.singup(email, password)
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          next: (resData) => {
            console.log(resData);
          },
          error: (error) => {
            console.log(error);
          }
        });
    }

    form.reset();
  }
}