/* eslint-disable */
export default function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(
        function (registrations) {
          for (let registration of registrations) {
            registration.unregister()
              .then(unregistered => {
                if (unregistered) {
                  console.log('Service worker removed successfully');
                } else {
                  console.log('Failed to unregister service worker');
                }
              });
          }
        },
      );
  }
}
