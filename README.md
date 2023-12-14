# PWA - SvelteKit

Getting started with PWA in SvelteKit.

## 🌍 Check it out live

- https://pwa-sveltekit.onrender.com/

## 🚀 Quick start

```bash
npm i
npm run dev
```

## 📚 Demo ?

Online, I can:

- list countries
- go a a country page
- build a list of countries I want to visit or skip

Offine, I can:

- list countries (if you saw the list before)
- go a a country page (if you saw the country before)
- build a list of countries I want to visit or skip

When you go back online, you can sync your list with the server.

## 💡 Tips

### Default port for PWA

Don't use the default port of SvelteKit, to not have a service workers on this default port that will mess with your other projects!

### Deploy

You can check the deployment configuration in the file [render.yaml](./render.yaml).

Go to render, and add a blueprint pointing at your repo, and that's it!

### Clean ALL Service Workers

1. To delete all service workers in your browser, open the console int the page [chrome://serviceworker-internals/?devtools](chrome://serviceworker-internals/?devtools) and run:

```js
document.querySelectorAll('.unregister').forEach((item) => item.click());
```
