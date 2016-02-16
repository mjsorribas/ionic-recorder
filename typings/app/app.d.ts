// app.d.ts - type definitions that avoid incorrect compiler warnings

// avoid compiler complaint that 'style' does not exist on type Element in tabs.ts line:
// document.querySelector('#tabs ion-tabbar-section').style.display = 'none';

interface ElementStyle {
    display: string;
}

interface Element {
    style?: ElementStyle;
}
