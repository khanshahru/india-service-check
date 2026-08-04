/**
 * Utility to resolve API endpoints dynamically.
 * If running inside a Capacitor native app context, it directs API requests to the cloud-hosted backend.
 * In a standard web browser context, it uses standard relative paths.
 */
export const getApiUrl = (path: string): string => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  // Check if we are running in a native Capacitor Android context
  const isCapacitor = 
    typeof window !== "undefined" && 
    (window.location.protocol === "capacitor:" || 
     window.location.hostname === "localhost" && !window.location.port);

  if (isCapacitor) {
    // Live Cloud Run URL for standard API proxying
    return `https://ais-dev-gbtjhea2yajsvkljtshvd3-967244605315.asia-southeast1.run.app${cleanPath}`;
  }

  return cleanPath;
};
