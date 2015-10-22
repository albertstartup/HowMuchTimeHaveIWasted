var interval;
var intervalLength;
var intervalsElapsed;

chrome.browserAction.onClicked.addListener(function() {
  
  if (interval) {
    clearInterval(interval);
    interval = null;
    chrome.notifications.create('ended', {
      type: 'basic',
      iconUrl: '/sadbert.jpg',
      title: 'How Much Time Have I Wasted',
      message: ':(' 
    }, function() {
      
      setTimeout(
        function() {
          chrome.notifications.clear('ended');
        },
        1000 * 2
      );
      
    });
  } else {
    interval = null;
    intervalLength = 1000 * 15;
    intervalsElapsed = 0;
    
    interval = setInterval(notify, intervalLength);
    chrome.notifications.create('go', {
      type: 'basic',
      iconUrl: '/bert.jpg',
      title: 'How Much Time Have I Wasted',
      message: 'Go!' 
    }, function() {
      
      setTimeout(
        function() {
          chrome.notifications.clear('go');
        },
        1000 * 2
      );
      
    });
  }
  
});

notify = function() {
  // Increment intervalsElapsed everytime this function is ran
  ++intervalsElapsed;
  
  chrome.notifications.create('main', {
    type: 'basic',
    iconUrl: '/bert.jpg',
    title: 'How Much Time Have I Wasted',
    message: intervalsElapsed/4 + ' beautiful minutes gone'
  }, function() {
    
    // Close notification
    setTimeout(
      function() {
        chrome.notifications.clear('main');
      },
      1000 * 4
    );
    
  });
  
};


chrome.notifications.onClicked.addListener(function(notificationName) {
  
  if (notificationName == 'main') {
    
    // Reset intervalsElapsed
    intervalsElapsed = 0;
    chrome.notifications.create('go', {
      type: 'basic',
      iconUrl: '/bert.jpg',
      title: 'How Much Time Have I Wasted',
      message: 'Go!' 
    }, function() {
      
      setTimeout(
        function() {
          chrome.notifications.clear('go');
        },
        1000 * 2
      );
      
    });
    
  }
  
});
