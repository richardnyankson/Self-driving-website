const menuToggle = document.querySelector('.toggle');
      const showcase = document.querySelector('.showcase');

      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        showcase.classList.toggle('active');
      })

    
      gapi.load('auth2', function() {
        gapi.auth2.init({
        client_id: '410532397292-u6uub98m4ia8ifaef0aenqo6a64kk2pd.apps.googleusercontent.com',
    });
  });


// Handle the sign-in process
function onSignIn(googleUser) {

var profile = googleUser.getBasicProfile();
var id_token = googleUser.getAuthResponse().id_token;
// Send the ID token to your server for verification and authentication
}