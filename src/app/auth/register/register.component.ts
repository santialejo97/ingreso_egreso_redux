import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { isLoading } from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  loading!: boolean;
  uiSubscrition!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });

    this.uiSubscrition = this.store.select('ui').subscribe((ui) => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscrition.unsubscribe();
  }

  crearUsuario() {
    if (this.registerForm.invalid) return;

    this.store.dispatch(isLoading({ value: true }));
    // Swal.fire({
    //   title: 'Espere Por favor',
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    this.authService
      .crearUsuario(this.registerForm.value)
      .then((credenciales) => {
        console.log(credenciales);
        // Swal.close();
        this.store.dispatch(isLoading({ value: false }));
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.error(err);
        this.store.dispatch(isLoading({ value: false }));
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
