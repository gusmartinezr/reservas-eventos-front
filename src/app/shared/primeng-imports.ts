import { importProvidersFrom } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

// Exporta todos los módulos de PrimeNG y otros módulos compartidos
export const SHARED_PRIMENG_IMPORTS = [
  CommonModule,
  ReactiveFormsModule,
  ButtonModule,
  InputTextModule,
  CardModule,
  ToastModule,
  MessagesModule,
  MessageModule,
  TieredMenuModule,
  MenubarModule,
  TableModule,
  DialogModule,
  DropdownModule,
];

export const PRIMENG_PROVIDERS = [
  importProvidersFrom(...SHARED_PRIMENG_IMPORTS),
];
