/**
 * Assign __env to the root window object.
 *
 * The goal of this file is to allow the deployment
 * process to pass in environment values into the application.
 *
 * The deployment process can overwrite this file to pass in
 * custom values:
 *
 * window.__env = window.__env || {};
 * window.__env.url = 'some-url';
 * window.__env.key = 'some-key';
 *
 * Keep the structure flat (one level of properties only) so
 * the deployment process can easily map environment keys to
 * properties.
 */

(function (window) {
  window.__env = window.__env || {};

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
  window.__env.enableSSL = false;
  //html5Mode = true means use urlrewrite (no hash)
  window.__env.html5Mode = true;

  window.__env.autoResolveHost = true;


  // API url
  // For demo purposes we fetch from local file in this plunk
  // In your application this can be a url like https://api.github.com
  window.__env.hostname = 'localhost';

  window.__env.host = window.__env.autoResolveHost ? location.protocol.concat("//").concat(window.location.hostname) : ((window.__env.enableSSL ? 'https://' : 'http://') + window.__env.hostname);

  window.__env.apiUrl =  window.__env.host + '/xcelerate/d3';

}(this));
