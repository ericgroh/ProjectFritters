import { PropDialogComponent } from 'src/app/shared/components/prop-dialog/prop-dialog.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthService } from './shared/services/auth.service';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './pages/profile/profile.component';
import { RulesComponent } from './pages/rules/rules.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateSheetComponent } from './pages/sheet/create/create-sheet.component';
import { SheetComponent } from './pages/sheet/details/sheet-details.component';
import { JoinSheetComponent } from './pages/sheet/join/join-sheet.component';
import { UpdateSheetComponent } from './pages/sheet/update/update-sheet.component';
import { SheetsComponent } from './shared/components/sheets/sheets.component';
import { EntryComponent } from './pages/sheet/entry/entry.component';
import { PropComponent } from './shared/components/prop/prop.component';
import { PropButtonComponent } from './shared/components/prop-button/prop-button.component';
import { EntriesComponent } from './shared/components/entries/entries.component';
import { KeyComponent } from './pages/sheet/key/key.component';
import { PropSelectComponent } from './shared/components/prop-select/prop-select.component';
import { PropNumberComponent } from './shared/components/prop-number/prop-number.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProfileComponent,
    RulesComponent,
    CreateSheetComponent,
    SheetComponent,
    JoinSheetComponent,
    PropDialogComponent,
    UpdateSheetComponent,
    SheetsComponent,
    EntryComponent,
    PropComponent,
    PropButtonComponent,
    EntriesComponent,
    KeyComponent,
    PropSelectComponent,
    PropNumberComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    DragDropModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatStepperModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AppRoutingModule,
    NgxExtendedPdfViewerModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
