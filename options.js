// Saves options to chrome.storage
function save_options() {
    var uc_username = document.getElementById('uc_username').value;
    var uc_password = document.getElementById('uc_password').value;
    chrome.storage.sync.set({
      uc_username: uc_username,
      uc_password: uc_password
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
      uc_username: '',
      uc_password: ''
    }, function(items) {
      document.getElementById('uc_username').value = items.uc_username;
      document.getElementById('uc_password').value = items.uc_password;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);