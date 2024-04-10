export function randomUUIDv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0; // Convert to integer
    const v = c === 'x' ? r : (r & 0x3) | 0x8; // Use ternary operator for clarity

    return v.toString(16);
  });
}

export function randomIntBetween(min: number, max: number): number {
  // Ensure correct inclusive behavior:
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
