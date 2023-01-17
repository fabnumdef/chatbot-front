import { Component, OnDestroy, OnInit } from '@angular/core';
import { IntentService } from '@core/services/intent.service';
import { Observable, Subscription } from 'rxjs';
import { Intent } from '@model/intent.model';
import { CreateEditIntentDialogComponent } from './create-edit-intent-dialog/create-edit-intent-dialog.component';
import { IntentFinderDialogComponent } from './intent-finder-dialog/intent-finder-dialog.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { PanZoomAPI, PanZoomConfig } from 'ngx-panzoom';
import domtoimage from 'dom-to-image';
import * as moment from 'moment';

@Component({
  selector: 'app-intent-full-tree',
  templateUrl: './intent-full-tree.component.html',
  styleUrls: ['./intent-full-tree.component.scss']
})
export class IntentFullTreeComponent implements OnInit, OnDestroy {

  // intents$: BehaviorSubject<Intent[]>;
  notSingleIntents: Intent[] = [];
  loading$: Observable<boolean>;
  dragScrollDisabled = true;
  fullScreen = false;
  onLeafSelected: string;
  onHighlightLeafs: string;
  panZoomConfig: PanZoomConfig = new PanZoomConfig({
    zoomOnDoubleClick: false,
    zoomOnMouseWheel: false,
    panOnClickDrag: true,
    keepInBounds: false
  });
  dataUrl: string;
  public panZoomAPI: PanZoomAPI;
  private _apiSubscription: Subscription;

  constructor(private _intentService: IntentService,
              private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loading$ = this._intentService.loading$;
    this._intentService.entities$.subscribe(intents => {
      this.notSingleIntents = intents.filter(i => i.nextIntents && i.nextIntents.length > 0);
    });
    this._apiSubscription = this.panZoomConfig.api.subscribe((api: PanZoomAPI) => this.panZoomAPI = api);
  }

  ngOnDestroy(): void {
    this._apiSubscription.unsubscribe();  // don't forget to unsubscribe.  you don't want a memory leak!
  }

  public showFullScreen() {
    this.fullScreen = !this.fullScreen;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  }

  public createIntent(): void {
    const dialogRef = this._dialog.open(CreateEditIntentDialogComponent, {
      data: {
        intent: new Intent()
      },
      maxHeight: '80vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this._addIntent(result);
    });
  }

  public findIntent(): void {
    const dialogRef = this._dialog.open(IntentFinderDialogComponent, {
      width: '80vw',
      maxHeight: '80vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this._addIntent(result);
    });
  }

  public zoomOut() {
    this.panZoomAPI.zoomOut();
  }

  public zoomIn() {
    this.panZoomAPI.zoomIn();
  }

  public getZoomLevel() {
    return this.panZoomAPI?.model?.zoomLevel;
  }

  public async print() {
    // Get the chart
    const node = document.getElementsByClassName('intent-full-tree-wrapper')[0];
    this.dataUrl = await domtoimage.toPng(node);

    const btn: HTMLElement = document.getElementById('exportTreePng');
    btn.click();
  }

  downloadCanvasBest(event) {
    const anchor = event.target;
    const name = 'arbre-' + moment(new Date()).format('DDMMYYYYHHmmss') + '.jpg';

    // get the canvas
    anchor.href = this.dataUrl;
    anchor.download = name;
  }

  private _addIntent(intent: Intent) {
    this.notSingleIntents.push(intent);
  }
}
