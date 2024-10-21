'use server';

import { TLogInData, TSignUpData } from '@/types/auth';

export async function logIn(data: TLogInData) {
  console.log(data);
}

export async function signUp(data: TSignUpData) {
  console.log(data);
}
