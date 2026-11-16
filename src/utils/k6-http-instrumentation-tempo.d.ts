// k6-http-instrumentation-tempo.d.ts for version 1.0.1
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'https://jslib.k6.io/http-instrumentation-tempo/1.0.1/index.js' {
  interface InstrumentationOptions {
    sampling?: number;
    propagator: "w3c" | "jaeger";
  }
  class Client {
    constructor(
      opts: InstrumentationOptions,
      originalRequest?: (method: string, url: string, ...args: any[]) => any,
      originalAsyncRequest?: (method: string, url: string, ...args: any[]) => Promise<any>
    );
    configure(opts: InstrumentationOptions): void;
    request(method: string, url: string, ...args: any[]): any;
    async asyncRequest(method: string, url: string, ...args: any[]): Promise<any>;
    del(url: string, ...args: any[]): any;
    get(url: string, ...args: any[]): any;
    head(url: string, ...args: any[]): any;
    options(url: string, ...args: any[]): any;
    patch(url: string, ...args: any[]): any;
    post(url: string, ...args: any[]): any;
    put(url: string, ...args: any[]): any;
  }
  export function instrumentHTTP(opts: InstrumentationOptions): void;
  const exp: {
    Client: typeof Client;
    instrumentHTTP: typeof instrumentHTTP;
  };

  export { Client, instrumentHTTP };
  export default exp;
}
