import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {
  // the role the user must have
  @Input() appHasRole: string;

  stop$ = new Subject();

  isVisible = false;

  /**
   * @param {ViewContainerRef} _viewContainerRef
   *  -- the location where we need to render the templateRef
   * @param {TemplateRef<any>} _templateRef
   *   -- the templateRef to be potentially rendered
   * @param {AuthService} _authService
   *   -- will give us access to the roles a user has
   */
  constructor(private _viewContainerRef: ViewContainerRef,
              private _templateRef: TemplateRef<any>,
              private _authService: AuthService
  ) {
  }

  ngOnInit() {
    //  We subscribe to the roles$ to know the roles the user has
    this._authService.user$.pipe(
      takeUntil(this.stop$)
    ).subscribe(user => {
      // If he doesn't have any roles, we clear the viewContainerRef
      if (!user?.role) {
        this._viewContainerRef.clear();
      }
      // If the user has the role needed to
      // render this component we can add it
      if (user.role === this.appHasRole) {
        // If it is already visible (which can happen if
        // his roles changed) we do not need to add it a second time
        if (!this.isVisible) {
          // We update the `isVisible` property and add the
          // templateRef to the view using the
          // 'createEmbeddedView' method of the viewContainerRef
          this.isVisible = true;
          this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
      } else {
        // If the user does not have the role,
        // we update the `isVisible` property and clear
        // the contents of the viewContainerRef
        this.isVisible = false;
        this._viewContainerRef.clear();
      }
    });
  }

  // Clear the subscription on destroy
  ngOnDestroy() {
    this.stop$.next();
  }
}
