# VidyoIOCordovaPlugin

This is a Vidyo.io Android and iOS plugin for Cordova. This plugin is built using the Vidyo.io Android sample available @ https://vidyo.io. 

- [How to use this plugin](#how-to-use)
- [Sample Cordova project using this Plugin](#how-to-import-this-plugin-in-to-a-cordova-project)
- [How to create this plugin from scratch (optional)](#how-to-create-this-plugin-from-scratch)
- [iOS](#ios)


## How to use

      cordova plugin add <path-to-plugin-folder>
      
 OR,
 
      cordova plugin add https://github.com/Vidyo/VidyoIOCordovaPlugin.git
      


## How to import this plugin in to a Cordova Project

Here we demontrate how to create a sample Cordova project and import the VidyoIOCordovaPlugin in to that project.

### Prerequisites

- npm - Node.js package manager. I have used NodeJS version 6.9.1. Download from - https://nodejs.org/en/
- Android SDK with Android API 26 (v8.0) installed.
- AndroidStudio if you want to debug the application

### Install Cordova
      $ npm install -g cordova [I have used Cordova 7.0.1]
      
### Create a Cordova project
      $ cordova create VidyoIOHybrid com.vidyo.vidyoiohybrid "VidyoIOHybrid app"

### Add Android platform to this project
      $ cd VidyoIOHybrid
      $ cordova platform add android
    
### Now add the previously built Vidyo.IO plugin to this project
      $ cordova plugin add <plugin-path>  
 OR,
      
      $ cordova plugin add https://github.com/Vidyo/VidyoIOCordovaPlugin.git
      
This step copies all the relevant files from the plugin folder to the Cordova project folder. It also merges the information related to permissions in to the AndroidManifest.xml. This step should complete without any errors.

### Make changes to Cordova application UI
Cordova application's main page is rendered using an html file - VidyoIOHybrid/www/index.html. Now we add a button to this html page. Clicking this button will launch the native Vidyo.IO activity. We also add text boxed to collect the information like vidyo resource ID, token, display name and server address.

```
<!DOCTYPE html>
<html>
<hea
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
<meta name="format-detection" content="telephone=no">
<meta name="msapplication-tap-highlight" content="no">
<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
<link rel="stylesheet" type="text/css" href="css/index.css">
<title>Hello World</title>
</head>
<body>
<div class="app">
<h1>Apache Cordova</h1>
<div id="deviceready" class="blink">
<p class="event listening">Connecting to Device</p>
<p class="event received">Device is Ready</p>
</div>
<p>
<label>Host:</label>
<input type = "text" id = "host" value = "prod.vidyo.io" />
</p>
<p>
<label>Name:</label>
<input type = "text" id = "name" value = "demoUser" />
</p>
<p>
<label>Resource ID:</label>
<input type = "text" id = "resource" value = "demoRoom" />
</p>
<p>
<label>Token:</label>
<input type = "text" id = "token" value = "" />
</p>
<button id = "new_activity">Launch Vidyo</button>
</div>
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="js/index.js"></script>
</body>
</html>

```
Next edit the VidyoIOHybrid/www/js/index.js and define the onclick event for the button we just added.

```
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
 
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
 
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
 
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
 
        console.log('Received Event: ' + id);
        document.getElementById("new_activity").addEventListener("click", new_activity);
    }
};
 
app.initialize();
 
function new_activity() {
    var token = document.getElementById("token").value;
    var host = document.getElementById("host").value;
    var name = document.getElementById("name").value;
    var resource = document.getElementById("resource").value;
 
    VidyoIOPlugin.launchVidyoIO([token,host,name,resource]);
}

```
#### Android

Few more changes before we can build the project

In VidyoIOHybrid\platforms\android\res\values\ folder you will have strings.xml and strings2.xml. Merge these files in to a single file strings.xml and delete strings2.xml

add an additional import to VidyoIOHybrid\platforms\android\src\com\vidyo\vidyoconnector\VidyoIOActivity.java

```
import com.vidyo.vidyoiohybrid.R;

```

In VidyoIOHybrid\platforms\android\build.gradle modify the "dependencies" section and add an entry for com.android.support:appcompat-v7:23.0.0

```
dependencies {
compile fileTree(dir: 'libs', include: '*.jar')
compile 'com.android.support:appcompat-v7:23.0.0'
// SUB-PROJECT DEPENDENCIES START
debugCompile(project(path: "CordovaLib", configuration: "debug"))
releaseCompile(project(path: "CordovaLib", configuration: "release"))
// SUB-PROJECT DEPENDENCIES END
}

```

Now it's time to build the project

      $ cd VidyoIOHybrid
      $ cordova build android

If the build is successful you can run the application

      $cordova run android
      