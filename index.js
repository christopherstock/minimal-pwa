
    console.log('index.js!')

    if (navigator.serviceWorker != null) {
      navigator.serviceWorker.register('sw.js')
      .then(function(registration) {
        console.log('Registered events at scope: ', registration.scope);
      });
    }

    fetch('./data.json')

    var statusEl = document.querySelector('#network-status')
    if (!navigator.onLine) {
      statusEl.classList = ['is-offline']
      statusEl.innerText = 'Offline'
    }
