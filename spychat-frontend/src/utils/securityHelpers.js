export const buildDeviceFingerprint = () => {
  const browser = navigator.userAgent;
  const os = navigator.platform;
  const resolution = `${window.innerWidth}x${window.innerHeight}`;
  const seed = `${browser}|${os}|${resolution}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return {
    device_fingerprint: `fp_${Math.abs(hash)}`,
    browser_name: browser,
    operating_system: os,
    screen_resolution: resolution,
  };
};
