import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';

const log = new Logger('Forgot');

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit, OnDestroy {
  version: string = environment.version;
  error: string | undefined;
  resetForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }
  public message: string;

  ngOnInit() {}

  ngOnDestroy() {}

  forgot() {
    this.isLoading = true;
    const forgot$ = this.authenticationService.forgotPassword(this.resetForm.value.email);
    forgot$
      .pipe(
        finalize(() => {
          this.resetForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        credentials => {
          this.message =
            "Check your inbox for the next steps. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address.";
          // log.debug(`${credentials.username} successfully logged in`);
          // this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
        },
        error => {
          log.debug(`Reset error: ${error}`);
          this.error = error;
        }
      );
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }
}
