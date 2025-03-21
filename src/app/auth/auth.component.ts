import {
  Component,
  DestroyRef,
  inject,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
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
  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.singUp(email, password)
    }

    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage)
        this.isLoading = false;
      }
    });

    form.reset();
  }

  private showErrorAlert(error: string) {
    this.container.clear();
    const componentRef = this.container.createComponent(AlertComponent);
    componentRef.instance.message = error;
    componentRef.instance.close
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.container.clear());
  }
}