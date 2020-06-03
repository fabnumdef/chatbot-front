import { animate, AnimationMetadata, style, transition, trigger } from '@angular/animations';

export const detailInOutAnimation: AnimationMetadata =
  trigger(
    'detailInOutAnimation',
    [
      transition(
        ':enter',
        [
          style({height: 0, opacity: 0}),
          animate('300ms ease-out',
            style({height: 300, opacity: 1}))
        ]
      ),
      transition(
        ':leave',
        [
          style({height: 300, opacity: 1}),
          animate('300ms ease-in',
            style({height: 0, opacity: 0}))
        ]
      )
    ]
  );

export const graphDetailInOutAnimation: AnimationMetadata =
  trigger(
    'detailInOutAnimation',
    [
      transition(
        ':enter',
        [
          style({height: 0, opacity: 0}),
          animate('300ms ease-out',
            style({height: 192, opacity: 1}))
        ]
      ),
      transition(
        ':leave',
        [
          style({height: 192, opacity: 1}),
          animate('300ms ease-in',
            style({height: 0, opacity: 0}))
        ]
      )
    ]
  );

