import { FsFile, UserLogin } from './sharedType';
import { crypto } from 'k6/experimental/webcrypto';

export function randomUUIDv4(): string {
  //This is an experimental module.
  return crypto.randomUUID();
}
export function randomIntBetween(min: number, max: number): number {

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomItem<T>(arrayOfItems: T[]): T {
  // Type safety and array length check:
  if (!arrayOfItems.length) {
    throw new Error('Array cannot be empty');
  }

  return arrayOfItems[Math.floor(Math.random() * arrayOfItems.length)];
}

export function* numberGenerator(firstId: number) {
  let id = firstId;
  while (true) {
    yield id++;
  }
}

export function randomString(length: number): string {
  // Handle negative or zero length:
  if (length <= 0) {
    throw new Error('Length must be positive');
  }
  const charset = 'abcdefghijklmnopqrstuvwxyz';
  let res = '';
  while (length--) {
    res += charset[Math.floor(Math.random() * charset.length)];
  }

  return res;
}

export function randomWords(words: number, length: number): string {
  if (words <= 0) {
    throw new Error('Words must be positive');
  }
  if (length <= 0) {
    throw new Error('Length must be positive');
  }
  let res = '';
  for (let i = 0; i < words; i++) {
    res += randomString(length);
  }

  return res;
}

export function randomAlphaNumericString(length: number) {
  // Handle negative or zero length:
  if (length <= 0) {
    throw new Error('Length must be positive');
  }
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let res = '';
  while (length--) {
    res += charset[Math.floor(Math.random() * charset.length)];
  }

  return res;
}

export function findBetween(
  content: string,
  left: string,
  right: string
): string {
  // Error handling for missing delimiters:
  if (!content.includes(left) || !content.includes(right)) {
    throw new Error(`Delimiters '${left}' and '${right}' not found`);
  }
  const start = content.indexOf(left) + left.length;
  const end = content.indexOf(right, start);

  return content.substring(start, end);
}

export function findPeakNumbers(min: number, max: number) {
  const peaks = [];
  for (let i = min + 1; i < max; i++) {
    if (
      i > min &&
      i < max &&
      i > Number(i.toString()[0]) + Number(i.toString()[1])
    ) {
      peaks.push(i);
    }
  }

  return peaks;
}

export async function readAllFile(file: FsFile): Promise<Uint8Array> {
  const fileInfo = await file.stat();
  const buffer = new Uint8Array(fileInfo.size);
  await file.read(buffer);

  return buffer;
}

export function getRandomUser(
  users: UserLogin[],
  excludeCurrentUser: UserLogin
): UserLogin {
  const userList = users.filter(
    (user) => user.userId !== excludeCurrentUser.userId
  );

  return userList[randomIntBetween(0, userList.length - 1)];
}
