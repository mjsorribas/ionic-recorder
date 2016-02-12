import {App, IonicApp, Platform} from 'ionic-framework/ionic';
import {TabsPage} from './pages/tabs/tabs';
import {HSV} from './providers/colormap';
import {AppState} from './providers/app-state';
import {WebAudioAPI} from './providers/web-audio-api';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';


@App({
    templateUrl: 'build/app.html',
    providers: [HSV, AppState, WebAudioAPI],
    config: {
        backButtonText: ''
    }
})
class MyApp {
    // make HelloIonicPage the root (or first) page
    rootPage: Type = TabsPage;
    pages: Array<{ title: string, component: Type, hide: boolean }>;

    constructor(private app: IonicApp, private platform: Platform) {

        this.initializeApp();

        // set our app's pages
        this.pages = [
            { title: 'Login', component: null, hide: true },
            { title: 'Signup', component: null, hide: true },
            { title: 'Logout', component: null, hide: true }
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // The platform is now ready. Note: if this callback fails to fire, follow
            // the Troubleshooting guide for a number of possible solutions:
            //
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //
            // First, let's hide the keyboard accessory bar (only works natively) since
            // that's a better default:
            //
            // Keyboard.setAccessoryBarVisible(false);
            //
            // For example, we might change the StatusBar color. This one below is
            // good for dark backgrounds and light text:
            // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
            console.log('App:this.platform.ready!');
        });
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.app.getComponent('leftMenu').close();
        // navigate to the new page if it is not the current page
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }
}
