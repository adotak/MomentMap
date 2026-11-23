# Event Horizon

Event Horizon is a lightweight, offline-first event management web app. It
helps organizers publish community events with accessibility information and
optional volunteer shifts, while allowing attendees to search and filter the
event list.

The app is a dependency-free static frontend built with HTML, CSS, and
vanilla JavaScript. It does not require a backend, database, build step, or
package installation.

## Features

- Add events with a name, date, and description.
- Mark events with available accessibility features:
  - Ramp or step-free access
  - Sign-language interpreter
  - Captions
  - Quiet room
  - Prayer space
- Search events by name or date.
- Filter events by one or more accessibility features. An event must provide
  every selected feature to be shown.
- Sort events chronologically, with the earliest event first.
- Identify past events with a subdued card style.
- Add an optional volunteer shift with a role, required volunteer count, and
  start/end times.
- Allow attendees to sign up for open volunteer shift places on the same
  device.
- Switch between English and Urdu. Urdu changes the page to right-to-left
  layout.
- Install and use the app as a Progressive Web App (PWA).
- Continue viewing and managing saved data while offline after the app shell
  has been cached.

## Run locally

Because service workers require a secure context, serve the repository through
`localhost` or HTTPS instead of opening `index.html` directly with a
`file://` URL.

With Python:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser.

Other static file servers, such as PHP's built-in server or `npx serve`, work
as well. No dependencies need to be installed for this project.

## Using the app

1. Open the app and add an event with its required name, date, and
   description.
2. Select any accessibility features and, if needed, configure a volunteer
   shift.
3. Use the search field to match event names or date values.
4. Use the accessibility filters to show only events that meet all selected
   requirements.
5. On an event with an open volunteer shift, enter a name and select **Sign
   up**.
6. Use the language selector in the header to switch between English and
   Urdu.

The repository includes three sample events on a first visit. Adding or
deleting events updates the list immediately.

## Offline behavior and data storage

The service worker caches the application shell:

- `index.html`
- `style.css`
- `script.js`
- `manifest.json`
- `icon.svg`

It also caches successful same-origin GET requests. To verify offline
behavior, open the app once through `localhost`, then enable the browser's
offline mode and reload the page.

All user data is stored locally in the browser with `localStorage`:

- `eventHorizonEvents` stores events, accessibility selections, and volunteer
  sign-ups.
- `eventHorizonLanguage` stores the selected interface language.

Data is specific to the current browser and device. There is no server-side
sync, shared event database, authentication, or cross-device backup.
Clearing site data removes the saved events and language preference.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Application markup and form controls |
| `script.js` | Event state, rendering, search/filtering, translations, persistence, and service-worker registration |
| `style.css` | Layout, event cards, forms, accessibility badges, and responsive styles |
| `service-worker.js` | App-shell caching and offline fetch handling |
| `manifest.json` | PWA metadata, display settings, theme colors, and icon |
| `icon.svg` | Calendar icon used by the PWA manifest |

## Browser requirements

Use a modern browser with support for `localStorage`, service workers,
web app manifests, and standard HTML form controls. Service workers are
available only from `localhost` or a secure HTTPS origin.

## License

No license file is currently included in this repository.
