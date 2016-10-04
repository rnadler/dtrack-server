import { Injectable } from '@angular/core';

export type InteralStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  private static USER_PROP = 'user';
  _state: InteralStateType = { };

  constructor() {

  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  setUser(user: String) {
    this.set(AppState.USER_PROP, user);
  }
  getUser() {
    return this.get(AppState.USER_PROP);
  }

  isLoggedIn() {
    return this.get(AppState.USER_PROP) == 'user';
  }

  private _clone(object: InteralStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
