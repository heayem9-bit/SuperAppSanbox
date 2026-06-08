export const injectedBridge = `
  window.NativeBridge = {
    openMap(lat, lng) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'OPEN_MAP',
        payload: { lat, lng }
      }));
    },

    share(text) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'SHARE',
        payload: { text }
      }));
    },

    openCamera() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'OPEN_CAMERA'
      }));
    },

    scanQr() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'SCAN_QR'
      }));
    },

    getProfile(profile) {
      if (typeof window.onGetProfile === 'function') {
        window.onGetProfile(profile);
      }
    },

    setBarTitle(title, bgColor, color, safeAreaColor) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'SET_BAR_TITLE',
        payload: { title, bgColor, color, safeAreaColor }
      }));
    },

    closeMiniApp() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'CLOSE_MINI_APP'
      }));
    }
  };

  true;
`;