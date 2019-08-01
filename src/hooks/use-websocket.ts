import { useState, useEffect } from "react";
import * as SockJS from 'sockjs-client';

export default function useWebSocket<T = any>(url: string, initial?: T) {
  const state = useState<T>(initial);

  useEffect(() => {
    let sock = new SockJS(url);
    sock.onmessage = (event: SockJS.MessageEvent) => {
      state[1](JSON.parse(event.data));
    };

    return function cleanup() {
      sock.close();
    }
  }, []);

  return state[0];
}
