import { wdpRequest } from '../internal/wdpRequest.js';
import type { WdpCtx } from '../WdpCtx.js';

export type Users = {
  Users: User[];
};

export type User = {
  UserId: number;
  EmailAddress: string;
  AutoSignIn: boolean;
  SignedIn: boolean;
  Gamertag?: string;
  XboxUserId?: string;
};

export type ActiveUser = {
  UserDisplayName: string;
  UserSID: string;
};

export function getSignedInUser(ctx: WdpCtx): Promise<ActiveUser> {
  return wdpRequest(ctx, 'api/users/activeuser');
}

export function getUsers(ctx: WdpCtx): Promise<Users> {
  return wdpRequest(ctx, 'ext/user');
}

export async function deleteUser(ctx: WdpCtx, userId: number): Promise<void> {
  await wdpRequest(ctx, 'ext/user', {
    method: 'PUT',
    json: {
      Users: [
        {
          UserId: userId,
          Delete: true,
        },
      ],
    },
  });
}

export async function addUser(ctx: WdpCtx, email: string, password: string, autoSignIn: boolean = false): Promise<void> {
  await wdpRequest(ctx, 'ext/user', {
    method: 'PUT',
    json: {
      Users: [
        {
          EmailAddress: email,
          Password: password,
          AutoSignIn: autoSignIn,
          SignedIn: true,
        },
      ],
    },
  });
}

export async function setUserSignInState(ctx: WdpCtx, userId: number, signIn: boolean): Promise<void> {
  await wdpRequest(ctx, 'ext/user', {
    method: 'PUT',
    json: {
      Users: [
        {
          UserId: userId,
          SignedIn: signIn,
        },
      ],
    },
  });
}
