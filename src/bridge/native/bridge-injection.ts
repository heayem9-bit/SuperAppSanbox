export const injectedBridge = `
  window.NativeBridge = {
    openMap: function(lat, lng) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'OPEN_MAP',
        lat: lat,
        lng: lng
      }));
    }
  };
  true;
`;
