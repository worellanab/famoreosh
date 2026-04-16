// Service Worker - PEAD Horarios
const CACHE = ‘pead-v1’;

self.addEventListener(‘install’, e => {
self.skipWaiting();
});

self.addEventListener(‘activate’, e => {
e.waitUntil(clients.claim());
});

// Escuchar mensajes del index para programar alarmas
self.addEventListener(‘message’, e => {
if (e.data && e.data.tipo === ‘programar’) {
programarAlertas(e.data.alertas);
}
});

let timers = [];

function cancelarTodo() {
timers.forEach(t => clearTimeout(t));
timers = [];
}

function programarAlertas(alertas) {
cancelarTodo();
const ahora = Date.now();
alertas.forEach(a => {
const diff = a.cuando - ahora;
if (diff > 0) {
const t = setTimeout(() => {
self.registration.showNotification(`🎒 ${a.hijo} · ${a.nombre}`, {
body: `${a.inicio} – ${a.fin}`,
icon: ‘/famoreosh/icon_final.png’,
badge: ‘/famoreosh/icon_final.png’,
tag: a.hijo + a.cuando,
renotify: true,
vibrate: [200, 100, 200]
});
}, diff);
timers.push(t);
}
});
}
