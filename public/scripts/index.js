console.log("load index");
window.setTimeout(loadApp,1);

var app=document.querySelector('#app');

//console.log("app",app.$.mainDrawer);



app.closeDrawer = function(){
	console.log("selected");
	this.$.mainDrawer.closeDrawer();
}

app.changepage=function(){
  this.$.mypages.selectNext();
}


app.page = "faqs";
app.loadAppFlag=0;


app._onPrevClick = function() {
this.$.pages.entryAnimation = 'fade-in-animation';
this.$.pages.exitAnimation = 'fade-out-animation';
this.$.pages.selected = this.$.pages.selected === 0 ? 2 : (this.$.pages.selected - 1);
}

app._onNextClick = function() {
	console.log("next");
this.$.pages.entryAnimation = 'fade-in-animation';
this.$.pages.exitAnimation = 'fade-out-animation';
this.$.pages.selected = this.$.pages.selected === 2 ? 0 : (this.$.pages.selected + 1);
}

window.addEventListener('WebComponentsReady', function() {
// Explicitly call the register() method. We need to wait until the template's variables are
// all set first, since the configuration depends on bound variables.
document.querySelector('platinum-sw-register').register();
console.log("registered");
});


app.displayInstalledToast = function() {
	console.log("caching-complete");
  document.querySelector('#caching-complete').show();
};


app.displayErrorToast = function(ss) {
	console.log("caching-Error",app.state,ss);
  document.querySelector('#caching-incomplete').show();
};

app.fired = function(ss) {
	console.log("fired",ss);
};

function loadApp()
{

app.loadAppFlag=1;
}