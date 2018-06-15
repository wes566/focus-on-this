/**
 * Returns true if running in Standalone/App mode, in other words, launched from
 * the homescreen like a native app
 *
 * @export
 * @returns {boolean}
 */
export function isStandaloneApp(): boolean {
  return "standalone" in window.navigator && (window.navigator as any).standalone;
}


/**
 * Returns true if running on iOS in Safari browser (and not in Standlone/App mode)
 *
 * @export
 * @returns {boolean}
 */
export function isSafariMobile(): boolean {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i) || !!ua.match(/iPod/i);
  const webkit = !!ua.match(/WebKit/i);

  // Chrome browser on iOS has similar UA but it adds some CriOS part so just look for that
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  return iOSSafari && !isStandaloneApp();
}
