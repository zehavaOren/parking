import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EmployeeSubscriptionDetailsComponent } from './modules/employee_subscription_details/employee-subscription-details/employee-subscription-details.component';
import { MainComponent } from './pages/main/main.component';




export const titles = [
  'עובדים ומנויים',
  'הגדרות מערכת'
]

export const mainRoutes1: Routes = [
  {
    path: 'UpdatesAndAlerts', loadChildren: () => import('./pages/Updates and alerts/UpdatesAndAlerts.module')
      .then(m => m.UpdatesAndAlertsModule)
  },
  {
    path: 'WaitingConfirmation', loadChildren: () => import('./pages/Waiting_confirmation/waiting-confirmation.module')
      .then(m => m.WaitingConfirmationModule)
  },
  {
    path: 'WaitingParking', loadChildren: () => import('./pages/waiting_parking/waiting_parking.module')
      .then(m => m.WaitingParkingModule)
  },
  {
    path: 'EmployeeSubscriptions', loadChildren: () => import('./pages/Employee subscriptions/employeeSubscriptions.module')
      .then(m => m.EmployeeSubscriptionsModule)
  },
  // {
  //   path: 'workers', loadChildren: () => import('./pages/workers/worker.module')
  //     .then(m => m.WorkerModule)
  // },
  {
    path: 'PayrollReports', loadChildren: () => import('./pages/Payroll reports/payrollReports.module')
      .then(m => m.PayrollReportsModule)
  },
  {
    path: 'EligibilityWaive', loadChildren: () => import('./pages/Eligibility waive/eligibility-waive.module')
      .then(m => m.EligibilityWaiveModule)
  },
  {
    path: 'Subscribers', loadChildren: () => import('./pages/Subscribers/subscribers.module')
      .then(m => m.SubscribersModule)
  },
  {
    path: 'demo', loadChildren: () => import('./pages/demo-page/demo-page.module')
      .then(m => m.DemoPageModule)
  },
  // {
  //   path: 'Search', loadChildren: () => import('./pages/Search/search.module')
  //     .then(m => m.SearchModule)
  // },
];

export const mainRoutes2: Routes = [
  {
    path: 'CodeTables', loadChildren: () => import('./pages/Code tables/codeTables.module')
      .then(m => m.CodeTablesModule)
  },
  {
    path: 'entitlement', loadChildren: () => import('./pages/Entitlement/entitlement.module')
      .then(m => m.EntitlementModule)
  },
];

export const mainRoutes: Routes = [
  {
    path: '', component: MainComponent, children: [
      ...mainRoutes1, ...mainRoutes2,
      {
        path: 'EmployeeSubscriptionDetails', loadChildren: () => import('./modules/employee_subscription_details/employee_subscription_details.module')
          .then(m => m.EmployeeSubscriptionDetailsModule)
      },
      { path: '', redirectTo: "UpdatesAndAlerts", pathMatch: "full" },
    ]
  },

  { path: '**', redirectTo: "", pathMatch: "full" }
]


@NgModule({
  imports: [RouterModule.forRoot(mainRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
