import { useState, useEffect, useCallback } from 'react';

export interface LiveRideWait {
  waitTime: number;
  status: 'OPERATING' | 'CLOSED' | 'DOWN' | 'ESTIMATED';
  isLive: boolean;
  lastUpdated: string;
}

export function useLiveWaitTimes(wikiEntityId?: string) {
  const [waitTimes, setWaitTimes] = useState<Record<string, LiveRideWait>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

  const fetchLiveTimes = useCallback(async () => {
    if (!wikiEntityId) {
      setWaitTimes({});
      setIsLiveConnected(false);
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    try {
      const res = await fetch(`https://api.themeparks.wiki/v1/entity/${wikiEntityId}/live`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      const liveMap: Record<string, LiveRideWait> = {};

      if (Array.isArray(data?.liveData)) {
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        data.liveData.forEach((item: any) => {
          if (item?.name) {
            const normalizedName = item.name.toLowerCase().trim();
            const standbyWait = item.queue?.STANDBY?.waitTime;
            const status = item.status === 'OPERATING' ? 'OPERATING' : item.status === 'CLOSED' ? 'CLOSED' : 'DOWN';

            liveMap[normalizedName] = {
              waitTime: typeof standbyWait === 'number' ? standbyWait : 0,
              status: status,
              isLive: true,
              lastUpdated: nowStr,
            };
          }
        });
      }

      setWaitTimes(liveMap);
      setIsLiveConnected(Object.keys(liveMap).length > 0);
      setLastFetchTime(new Date());
    } catch (err) {
      // Graceful fallback to estimated wait times
      setIsLiveConnected(false);
      setLastFetchTime(new Date());
    } finally {
      setIsLoading(false);
    }
  }, [wikiEntityId]);

  useEffect(() => {
    fetchLiveTimes();
  }, [fetchLiveTimes]);

  return {
    waitTimes,
    isLoading,
    isLiveConnected,
    lastFetchTime,
    refresh: fetchLiveTimes,
  };
}
