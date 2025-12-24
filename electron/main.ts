import { app, BrowserWindow, globalShortcut } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
	app.quit();
}

function createWindow() {
	
	win = new BrowserWindow({
		width: 1200,
		height: 700,
		// fullscreen: true,
		// show: false,
		autoHideMenuBar: true,
		icon: path.join(process.env.VITE_PUBLIC, 'main-icon.png'),
		webPreferences: {
			preload: path.join(__dirname, 'preload.mjs'),
		},
	})

	// Quando clicar no X, só esconde a janela
	win.on('close', (event) => {
		event.preventDefault();
		win?.hide();
	});
	
	win?.maximize();

	// // Test active push message to Renderer-process.
	// win.webContents.on('did-finish-load', () => {
	// 	win?.webContents.send('main-process-message', (new Date).toLocaleString())
	// })

	// win.once('ready-to-show', () => {
	// 	win?.maximize(); // Agora funciona sem mostrar a janela
	// });

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL)
	} else {
		// win.loadFile('dist/index.html')
		win.loadFile(path.join(RENDERER_DIST, 'index.html'))
	}
}

app.on('window-all-closed', (event: any) => {
	event.preventDefault();
})

app.on('activate', () => {
	if (win === null) createWindow();
})

// Se alguém tentar abrir outra instância
app.on('second-instance', () => {
	if (win) {
		if (win.isMinimized()) win.restore();
		win.show();
	}
});

app.whenReady().then(() => {
	createWindow();

	// Atalho global: Ctrl + Alt + Space
	globalShortcut.register('Ctrl+Alt+Space', () => {
		if (win?.isVisible()) {
			win.hide();
		} else {
			win?.show();
			win?.focus();
		}		
	});
});