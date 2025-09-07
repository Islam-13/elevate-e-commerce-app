import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const SessionActions = createActionGroup({
  source: 'Session',
  events: {
    'Restore From Storage': emptyProps(),                
    'Restore Done': props<{ token: string | null }>(),  
    'Activate': props<{ token: string }>(),               
    'Clear': emptyProps(),                             
  },
});
