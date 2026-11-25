This is a static frontend web application—also called a client-side web app.
Repository for Web Technologies Theory Assignment 01. 

## Offline-first PWA

The app includes a service worker and web app manifest. Once the app has
been opened successfully, its HTML, CSS, JavaScript, and manifest are cached
so the event manager can load without an internet connection.

Events are stored in the browser's `localStorage`, so creating, editing, and
deleting events continues to work offline on the same device and browser.

Events can include a location, category, start and end times, and an optional
event or registration link. Search also matches event locations, categories,
and descriptions.

## Accessibility filters

Organizers can mark events with ramp access, a sign-language interpreter,
captions, a quiet room, and/or a prayer space. Attendees can select one or
more of these features to show only events that provide all selected options.
These settings are stored with each event in `localStorage`.

## English and Urdu interface

Use the language selector in the header to switch the interface between
English and Urdu. Urdu enables right-to-left layout and the selected
language is remembered on the device. Event names and descriptions remain
in the language entered by the organizer.

## Volunteer shifts

When creating an event, organizers can optionally add a volunteer role,
number of required volunteers, and shift start/end times. Attendees can
enter their name on an event card to sign up locally. The card shows the
remaining openings, and all shift data is stored in `localStorage` for
offline use on the same device.

To test the PWA, serve this folder from `localhost` or HTTPS. Service workers
are disabled when opening `index.html` directly with a `file://` URL. After
the first successful load, switch the browser to offline mode and reload the
page.
