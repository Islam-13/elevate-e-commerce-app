import { createFeature, createReducer, on } from '@ngrx/store';
import { SessionActions } from './session.actions';
import { initialSessionState, SESSION_FEATURE_KEY, SessionState } from './session.state';

export const sessionFeature = createFeature({
  name: SESSION_FEATURE_KEY,
  reducer: createReducer(
    initialSessionState,
    on(SessionActions.restoreDone, (s, { token }): SessionState => ({ ...s, token })),
    on(SessionActions.activate,   (s, { token }): SessionState => ({ ...s, token })),
    on(SessionActions.clear,      () => initialSessionState),
  ),
});

export const {
  name: sessionFeatureKey,    
  reducer: sessionReducer,
  selectToken,               
} = sessionFeature;
