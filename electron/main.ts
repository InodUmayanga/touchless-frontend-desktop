import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow;

app.on('ready', createWindow);

function createWindow() {
  win = win = new BrowserWindow({ fullscreen: true });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/MEAN-APP/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  // win.webContents.openDevTools();

}
