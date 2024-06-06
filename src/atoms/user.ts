
import { atom } from 'recoil';

export const followingState = atom<string[]>({
  key: 'followedUsersState',
  default: [],
});

export const followersState = atom<string[]>({
  key: 'followersState',
  default: [],
});

export interface User {
  uid: string;
  name: string;
  email: string;
}


export const currentUserState = atom<User | null>({
  key: 'currentUserState',
  default: null,
});
