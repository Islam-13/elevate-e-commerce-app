export interface SessionState {
  token: string | null;
}
export const SESSION_FEATURE_KEY = 'session';

export const initialSessionState: SessionState = {
  token: null,
};
