function safeJsonParse<T>(str: unknown): T {
  try {
    const jsonValue = JSON.parse(str as string) as T;
    return jsonValue;
  } catch {
    return str as T;
  }
}

export default safeJsonParse;
