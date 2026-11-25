// ==================== INITIAL EVENTS (Sample Data) ====================
// This is an array of objects with predefined events to display initially
let events = [
    {
        name: "Tech Conference 2026",
        date: "2026-07-15",
        description: "Annual technology conference featuring talks from industry leaders."
    },
    {
        name: "Summer Workshop",
        date: "2026-06-20",
        description: "Hands-on workshop covering web development best practices."
    },
    {
        name: "Networking Meetup",
        date: "2026-06-10",
        description: "Connect with other developers and professionals in the tech industry."
    }
];

const savedEvents = localStorage.getItem("eventHorizonEvents");
if (savedEvents) {
    try {
        const parsedEvents = JSON.parse(savedEvents);
        if (Array.isArray(parsedEvents)) {
            events = parsedEvents;
        }
    } catch (error) {
        console.error("Could not load saved events:", error);
    }
}

function saveEvents() {
    localStorage.setItem("eventHorizonEvents", JSON.stringify(events));
}

// ==================== GET HTML ELEMENTS ====================
// These are variables that hold references to HTML elements we'll use in JavaScript
const eventForm = document.getElementById("eventForm");
const eventNameInput = document.getElementById("eventName");
const eventDateInput = document.getElementById("eventDate");
const eventDescriptionInput = document.getElementById("eventDescription");
const eventLocationInput = document.getElementById("eventLocation");
const eventCategoryInput = document.getElementById("eventCategory");
const eventStartTimeInput = document.getElementById("eventStartTime");
const eventEndTimeInput = document.getElementById("eventEndTime");
const eventLinkInput = document.getElementById("eventLink");
const addEventButton = document.getElementById("addEventButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const eventsList = document.getElementById("eventsList");
const searchInput = document.getElementById("searchInput");
const warningMessage = document.getElementById("warningMessage");
const connectionStatus = document.getElementById("connectionStatus");
const accessibilityInputs = document.querySelectorAll("input[name='accessibility']");
const accessibilityFilters = document.querySelectorAll("input[name='accessibility-filter']");
const languageSelect = document.getElementById("languageSelect");
const volunteerRoleInput = document.getElementById("volunteerRole");
const volunteerCountInput = document.getElementById("volunteerCount");
const volunteerStartInput = document.getElementById("volunteerStart");
const volunteerEndInput = document.getElementById("volunteerEnd");
let editingEventIndex = null;

const translations = {
    en: {
        direction: "ltr",
        subtitle: "Plan your events. Remember every moment.",
        languageLabel: "Language:",
        searchPlaceholder: "Search events by name or date...",
        searchLabel: "Search events by name or date",
        addEventHeading: "Add a New Event",
        editEventHeading: "Edit Event",
        eventNameLabel: "Event Name:",
        eventNamePlaceholder: "Enter event name",
        eventDateLabel: "Event Date:",
        eventLocationLabel: "Location:",
        eventLocationPlaceholder: "e.g. Community Hall",
        eventCategoryLabel: "Category:",
        selectCategory: "Select a category",
        categoryCommunity: "Community",
        categoryEducation: "Education",
        categoryArts: "Arts & culture",
        categorySports: "Sports",
        categoryOther: "Other",
        eventStartTimeLabel: "Start time:",
        eventEndTimeLabel: "End time:",
        eventLinkLabel: "Event or registration link:",
        eventDescriptionLabel: "Event Description:",
        eventDescriptionPlaceholder: "Enter event description",
        accessibilityLegend: "Accessibility Features Available",
        filterLegend: "Show events with all selected features",
        volunteerLegend: "Volunteer Shift (Optional)",
        volunteerRoleLabel: "Role:",
        volunteerRolePlaceholder: "e.g. Registration desk",
        volunteerCountLabel: "Volunteers needed:",
        volunteerCountPlaceholder: "e.g. 3",
        volunteerStartLabel: "Start:",
        volunteerEndLabel: "End:",
        addEventButton: "Add Event",
        updateEventButton: "Save Changes",
        cancelEditButton: "Cancel editing",
        editEvent: "Edit Event",
        eventsHeading: "Find Accessible Events",
        location: "Location",
        category: "Category",
        eventLink: "Event details / registration",
        eventTime: "Time",
        footerText: "© 2026 MomentMap. All rights reserved.",
        onlineStatus: "Online - your events are saved on this device.",
        offlineStatus: "Offline - you can still view and manage your saved events.",
        emptyEvents: "No events found. Add one to get started!",
        noAccessibility: "No accessibility features listed.",
        deleteEvent: "Delete Event",
        shiftDetails: "Volunteer shift",
        volunteersNeeded: "volunteers needed",
        volunteersRemaining: "openings remaining",
        noVolunteers: "No volunteer shift listed.",
        volunteerNamePlaceholder: "Your name",
        signUp: "Sign up",
        signedUp: "Signed up",
        volunteerNameRequired: "Please enter your name before signing up.",
        validation: "⚠️ Please fill in all fields (Event Name, Date, and Description)",
        timeValidation: "Please enter both event times, and make sure the end time is after the start time.",
        linkValidation: "Please enter a valid web link beginning with http:// or https://."
    },
    ur: {
        direction: "rtl",
        subtitle: "اپنے پروگرام بنائیں، ہر لمحہ یاد رکھیں",
        languageLabel: "زبان:",
        searchPlaceholder: "نام یا تاریخ کے ذریعے پروگرام تلاش کریں...",
        searchLabel: "نام یا تاریخ کے ذریعے پروگرام تلاش کریں",
        addEventHeading: "نیا پروگرام شامل کریں",
        editEventHeading: "پروگرام میں ترمیم",
        eventNameLabel: "پروگرام کا نام:",
        eventNamePlaceholder: "پروگرام کا نام درج کریں",
        eventDateLabel: "پروگرام کی تاریخ:",
        eventLocationLabel: "مقام:",
        eventLocationPlaceholder: "مثلاً کمیونٹی ہال",
        eventCategoryLabel: "قسم:",
        selectCategory: "قسم منتخب کریں",
        categoryCommunity: "کمیونٹی",
        categoryEducation: "تعلیم",
        categoryArts: "فن اور ثقافت",
        categorySports: "کھیل",
        categoryOther: "دیگر",
        eventStartTimeLabel: "آغاز کا وقت:",
        eventEndTimeLabel: "اختتام کا وقت:",
        eventLinkLabel: "پروگرام یا رجسٹریشن کا لنک:",
        eventDescriptionLabel: "پروگرام کی تفصیل:",
        eventDescriptionPlaceholder: "پروگرام کی تفصیل درج کریں",
        accessibilityLegend: "دستیابی کی سہولیات",
        filterLegend: "منتخب سہولیات رکھنے والے پروگرام دکھائیں",
        volunteerLegend: "رضاکاروں کی شفٹ (اختیاری)",
        volunteerRoleLabel: "ذمہ داری:",
        volunteerRolePlaceholder: "مثلاً رجسٹریشن ڈیسک",
        volunteerCountLabel: "ضروری رضاکار:",
        volunteerCountPlaceholder: "مثلاً 3",
        volunteerStartLabel: "آغاز:",
        volunteerEndLabel: "اختتام:",
        addEventButton: "پروگرام شامل کریں",
        updateEventButton: "تبدیلیاں محفوظ کریں",
        cancelEditButton: "ترمیم منسوخ کریں",
        editEvent: "پروگرام میں ترمیم",
        eventsHeading: "قابل رسائی پروگرام تلاش کریں",
        location: "مقام",
        category: "قسم",
        eventLink: "پروگرام کی تفصیل / رجسٹریشن",
        eventTime: "وقت",
        footerText: "© 2026 مومنٹ میپ۔ جملہ حقوق محفوظ ہیں۔",
        onlineStatus: "آن لائن - آپ کے پروگرام اس ڈیوائس پر محفوظ ہیں۔",
        offlineStatus: "آف لائن - آپ اپنے محفوظ پروگرام دیکھ اور منظم کر سکتے ہیں۔",
        emptyEvents: "کوئی پروگرام نہیں ملا۔ شروع کرنے کے لیے ایک پروگرام شامل کریں!",
        noAccessibility: "دستیابی کی سہولیات درج نہیں ہیں۔",
        deleteEvent: "پروگرام حذف کریں",
        shiftDetails: "رضاکاروں کی شفٹ",
        volunteersNeeded: "رضاکار درکار ہیں",
        volunteersRemaining: "جگہیں باقی ہیں",
        noVolunteers: "رضاکاروں کی شفٹ درج نہیں ہے۔",
        volunteerNamePlaceholder: "آپ کا نام",
        signUp: "رجسٹر کریں",
        signedUp: "رجسٹریشن مکمل",
        volunteerNameRequired: "رجسٹر کرنے سے پہلے اپنا نام درج کریں۔",
        validation: "⚠️ براہ کرم تمام خانے مکمل کریں (نام، تاریخ اور تفصیل)",
        timeValidation: "براہ کرم آغاز اور اختتام دونوں اوقات درج کریں اور یقینی بنائیں کہ اختتام کا وقت آغاز کے بعد ہے۔",
        linkValidation: "درست ویب لنک درج کریں جو http:// یا https:// سے شروع ہو۔"
    }
};

const accessibilityLabels = {
    "ramp": { en: "Ramp / step-free access", ur: "ریمپ / بغیر سیڑھی رسائی" },
    "sign-language": { en: "Sign-language interpreter", ur: "اشاروں کی زبان کا ترجمان" },
    "captions": { en: "Captions", ur: "تحریری عنوانات" },
    "quiet-room": { en: "Quiet room", ur: "پرسکون کمرہ" },
    "prayer-space": { en: "Prayer space", ur: "نماز کی جگہ" }
};

let currentLanguage = localStorage.getItem("eventHorizonLanguage") || "en";

function getTranslation(key) {
    return translations[currentLanguage][key];
}

function applyLanguage() {
    const translation = translations[currentLanguage];
    document.documentElement.lang = currentLanguage === "ur" ? "ur" : "en";
    document.documentElement.dir = translation.direction;
    document.querySelector(".language-picker").firstChild.textContent = `${translation.languageLabel} `;
    document.getElementById("appSubtitle").textContent = translation.subtitle;
    document.getElementById("searchInput").placeholder = translation.searchPlaceholder;
    document.getElementById("searchInput").setAttribute("aria-label", translation.searchLabel);
    document.getElementById("addEventHeading").textContent = editingEventIndex === null
        ? translation.addEventHeading
        : translation.editEventHeading;
    document.getElementById("eventNameLabel").textContent = translation.eventNameLabel;
    document.getElementById("eventName").placeholder = translation.eventNamePlaceholder;
    document.getElementById("eventDateLabel").textContent = translation.eventDateLabel;
    document.getElementById("eventLocationLabel").textContent = translation.eventLocationLabel;
    document.getElementById("eventLocation").placeholder = translation.eventLocationPlaceholder;
    document.getElementById("eventCategoryLabel").textContent = translation.eventCategoryLabel;
    document.querySelector("#eventCategory option[value='']").textContent = translation.selectCategory;
    ["community", "education", "arts", "sports", "other"].forEach(category => {
        document.querySelector(`#eventCategory option[value='${category}']`).textContent =
            translation[`category${category[0].toUpperCase()}${category.slice(1)}`];
    });
    document.getElementById("eventStartTimeLabel").textContent = translation.eventStartTimeLabel;
    document.getElementById("eventEndTimeLabel").textContent = translation.eventEndTimeLabel;
    document.getElementById("eventLinkLabel").textContent = translation.eventLinkLabel;
    document.getElementById("eventDescriptionLabel").textContent = translation.eventDescriptionLabel;
    document.getElementById("eventDescription").placeholder = translation.eventDescriptionPlaceholder;
    document.getElementById("accessibilityLegend").textContent = translation.accessibilityLegend;
    document.getElementById("filterLegend").textContent = translation.filterLegend;
    document.getElementById("volunteerLegend").textContent = translation.volunteerLegend;
    document.getElementById("volunteerRoleLabel").textContent = translation.volunteerRoleLabel;
    document.getElementById("volunteerRole").placeholder = translation.volunteerRolePlaceholder;
    document.getElementById("volunteerCountLabel").textContent = translation.volunteerCountLabel;
    document.getElementById("volunteerCount").placeholder = translation.volunteerCountPlaceholder;
    document.getElementById("volunteerStartLabel").textContent = translation.volunteerStartLabel;
    document.getElementById("volunteerEndLabel").textContent = translation.volunteerEndLabel;
    addEventButton.textContent = editingEventIndex === null
        ? translation.addEventButton
        : translation.updateEventButton;
    cancelEditButton.textContent = translation.cancelEditButton;
    document.getElementById("eventsHeading").textContent = translation.eventsHeading;
    document.getElementById("footerText").textContent = translation.footerText;
    document.querySelectorAll("[data-accessibility-label]").forEach(label => {
        const feature = label.dataset.accessibilityLabel;
        label.textContent = accessibilityLabels[feature][currentLanguage];
    });
    languageSelect.value = currentLanguage;
    updateConnectionStatus();
    searchEvents();
}

function updateConnectionStatus() {
    connectionStatus.textContent = navigator.onLine
        ? getTranslation("onlineStatus")
        : getTranslation("offlineStatus");
    connectionStatus.classList.toggle("offline", !navigator.onLine);
}

function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        return;
    }

    navigator.serviceWorker.register("./service-worker.js")
        .catch(error => {
            console.error("Could not register the service worker:", error);
        });
}

function createVolunteerDetails(event, eventIndex) {
    if (!event.volunteerShift || !event.volunteerShift.role || !event.volunteerShift.required) {
        return createEventText("p", "no-volunteers", getTranslation("noVolunteers"));
    }

    const shift = event.volunteerShift;
    const signups = Array.isArray(shift.signups) ? shift.signups : [];
    const remaining = Math.max(shift.required - signups.length, 0);
    const shiftDetails = document.createElement("div");
    shiftDetails.className = "volunteer-shift";
    shiftDetails.appendChild(createEventText("strong", "", `${getTranslation("shiftDetails")}: ${shift.role}`));
    if (shift.start && shift.end) {
        shiftDetails.appendChild(createEventText("span", "", `${shift.start} - ${shift.end}`));
    }
    shiftDetails.appendChild(createEventText(
        "span",
        "",
        `${remaining} ${getTranslation("volunteersRemaining")} (${shift.required} ${getTranslation("volunteersNeeded")})`
    ));

    if (remaining > 0) {
        const signupForm = document.createElement("div");
        signupForm.className = "volunteer-signup";
        const nameInput = document.createElement("input");
        nameInput.id = `volunteer-name-${eventIndex}`;
        nameInput.type = "text";
        nameInput.placeholder = getTranslation("volunteerNamePlaceholder");
        nameInput.setAttribute("aria-label", getTranslation("volunteerNamePlaceholder"));
        const signupButton = document.createElement("button");
        signupButton.className = "btn-signup";
        signupButton.type = "button";
        signupButton.textContent = getTranslation("signUp");
        signupButton.addEventListener("click", () => signUpForShift(eventIndex));
        signupForm.append(nameInput, signupButton);
        shiftDetails.appendChild(signupForm);
    } else {
        shiftDetails.appendChild(createEventText("p", "shift-full", getTranslation("signedUp")));
    }
    return shiftDetails;
}

function createEventText(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    element.textContent = text;
    return element;
}

function getCategoryLabel(category) {
    const key = `category${category[0].toUpperCase()}${category.slice(1)}`;
    return translations[currentLanguage][key] || category;
}

function getSafeEventUrl(value) {
    if (!value) {
        return "";
    }
    try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
    } catch (error) {
        return "";
    }
}

// ==================== DISPLAY EVENTS FUNCTION ====================
// This function creates and shows all events on the page
function displayEvents(eventsToShow = events) {
    // First, clear all existing event cards
    eventsList.innerHTML = "";

    // Check if there are any events to show
    if (eventsToShow.length === 0) {
        eventsList.textContent = getTranslation("emptyEvents");
        eventsList.className = "events-container empty-events";
        return;
    }

    eventsList.className = "events-container";

    // Loop through each event and create a card for it
    eventsToShow.forEach(event => {
        // Create a div for the event card
        const eventCard = document.createElement("div");
        eventCard.className = "event-card";

        // Check if the event date is in the past
        const eventDate = new Date(event.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

        if (eventDate < today) {
            // Add the "past-event" class to gray out past events
            eventCard.classList.add("past-event");
        }

        const eventAccessibility = Array.isArray(event.accessibility) ? event.accessibility : [];
        const eventIndex = events.indexOf(event);
        eventCard.appendChild(createEventText("h3", "", event.name));
        eventCard.appendChild(createEventText("p", "event-date", `📅 ${formatDate(event.date)}`));
        if (event.location) {
            eventCard.appendChild(createEventText("p", "event-detail", `${getTranslation("location")}: ${event.location}`));
        }
        if (event.category) {
            eventCard.appendChild(createEventText("p", "event-detail", `${getTranslation("category")}: ${getCategoryLabel(event.category)}`));
        }
        if (event.startTime || event.endTime) {
            const time = [event.startTime, event.endTime].filter(Boolean).join(" - ");
            eventCard.appendChild(createEventText("p", "event-detail", `${getTranslation("eventTime")}: ${time}`));
        }
        eventCard.appendChild(createEventText("p", "event-description", event.description));

        if (event.link && getSafeEventUrl(event.link)) {
            const link = document.createElement("a");
            link.className = "event-link";
            link.href = getSafeEventUrl(event.link);
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = getTranslation("eventLink");
            eventCard.appendChild(link);
        }

        if (eventAccessibility.length > 0) {
            const badges = document.createElement("div");
            badges.className = "accessibility-badges";
            badges.setAttribute("aria-label", "Accessibility features");
            eventAccessibility.forEach(feature => {
                badges.appendChild(createEventText(
                    "span",
                    "accessibility-badge",
                    accessibilityLabels[feature]?.[currentLanguage] || feature
                ));
            });
            eventCard.appendChild(badges);
        } else {
            eventCard.appendChild(createEventText("p", "no-accessibility", getTranslation("noAccessibility")));
        }
        eventCard.appendChild(createVolunteerDetails(event, eventIndex));

        const actions = document.createElement("div");
        actions.className = "event-actions";
        const editButton = document.createElement("button");
        editButton.className = "btn-edit";
        editButton.type = "button";
        editButton.textContent = getTranslation("editEvent");
        editButton.addEventListener("click", () => editEvent(eventIndex));
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn-delete";
        deleteButton.type = "button";
        deleteButton.textContent = getTranslation("deleteEvent");
        deleteButton.addEventListener("click", () => deleteEvent(eventIndex));
        actions.append(editButton, deleteButton);
        eventCard.appendChild(actions);

        // Add the card to the page
        eventsList.appendChild(eventCard);
    });
}

// ==================== FORMAT DATE FUNCTION ====================
// This function converts a date like "2026-07-15" to a readable format like "July 15, 2026"
function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);
    const locale = currentLanguage === "ur" ? "ur-PK" : "en-US";
    return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(date);
}

// ==================== ADD EVENT FUNCTION ====================
// This function runs when the user clicks the "Add Event" button
function addEvent(e) {
    e.preventDefault(); // Prevent the form from refreshing the page

    const name = eventNameInput.value.trim();
    const date = eventDateInput.value;
    const description = eventDescriptionInput.value.trim();
    const startTime = eventStartTimeInput.value;
    const endTime = eventEndTimeInput.value;
    const link = eventLinkInput.value.trim();
    const accessibility = Array.from(accessibilityInputs)
        .filter(input => input.checked)
        .map(input => input.value);
    const volunteerRole = volunteerRoleInput.value.trim();
    const volunteerCount = Number.parseInt(volunteerCountInput.value, 10);
    const previousShift = editingEventIndex === null ? null : events[editingEventIndex]?.volunteerShift;
    const volunteerShift = volunteerRole && volunteerCount > 0
        ? {
            role: volunteerRole,
            required: volunteerCount,
            start: volunteerStartInput.value,
            end: volunteerEndInput.value,
            signups: Array.isArray(previousShift?.signups) ? previousShift.signups : []
        }
        : null;

    if (!name || !date || !description) {
        warningMessage.textContent = getTranslation("validation");
        warningMessage.classList.add("show");
        return;
    }

    if (Boolean(startTime) !== Boolean(endTime) || (startTime && endTime <= startTime)) {
        warningMessage.textContent = getTranslation("timeValidation");
        warningMessage.classList.add("show");
        return;
    }

    const safeLink = getSafeEventUrl(link);
    if (link && !safeLink) {
        warningMessage.textContent = getTranslation("linkValidation");
        warningMessage.classList.add("show");
        return;
    }

    warningMessage.classList.remove("show");
    const newEvent = {
        name,
        date,
        description,
        location: eventLocationInput.value.trim(),
        category: eventCategoryInput.value,
        startTime,
        endTime,
        link: safeLink,
        accessibility: accessibility,
        volunteerShift: volunteerShift
    };

    if (editingEventIndex === null) {
        events.push(newEvent);
    } else {
        events[editingEventIndex] = newEvent;
    }
    sortEventsByDate();
    saveEvents();
    resetEventForm();
    searchEvents();
}

function editEvent(index) {
    const event = events[index];
    if (!event) {
        return;
    }

    editingEventIndex = index;
    eventNameInput.value = event.name;
    eventDateInput.value = event.date;
    eventDescriptionInput.value = event.description;
    eventLocationInput.value = event.location || "";
    eventCategoryInput.value = event.category || "";
    eventStartTimeInput.value = event.startTime || "";
    eventEndTimeInput.value = event.endTime || "";
    eventLinkInput.value = event.link || "";
    accessibilityInputs.forEach(input => {
        input.checked = Array.isArray(event.accessibility) && event.accessibility.includes(input.value);
    });

    const shift = event.volunteerShift || {};
    volunteerRoleInput.value = shift.role || "";
    volunteerCountInput.value = shift.required || "";
    volunteerStartInput.value = shift.start || "";
    volunteerEndInput.value = shift.end || "";
    document.getElementById("addEventHeading").textContent = getTranslation("editEventHeading");
    addEventButton.textContent = getTranslation("updateEventButton");
    cancelEditButton.hidden = false;
    warningMessage.classList.remove("show");
    eventForm.scrollIntoView({ behavior: "smooth", block: "start" });
    eventNameInput.focus();
}

function resetEventForm() {
    eventForm.reset();
    editingEventIndex = null;
    document.getElementById("addEventHeading").textContent = getTranslation("addEventHeading");
    addEventButton.textContent = getTranslation("addEventButton");
    cancelEditButton.hidden = true;
    warningMessage.classList.remove("show");
}

// ==================== SORT EVENTS BY DATE ====================
// This function automatically sorts events by date (earliest first)
function sortEventsByDate() {
    events.sort((event1, event2) => {
        const date1 = new Date(event1.date);
        const date2 = new Date(event2.date);
        return date1 - date2; // Returns negative if date1 is earlier, positive if later
    });
}

// ==================== DELETE EVENT FUNCTION ====================
// This function removes an event from the list
function deleteEvent(index) {
    if (editingEventIndex === index) {
        resetEventForm();
    } else if (editingEventIndex !== null && editingEventIndex > index) {
        editingEventIndex -= 1;
    }
    events.splice(index, 1);
    saveEvents();
    searchEvents();
}

function signUpForShift(index) {
    const nameInput = document.getElementById(`volunteer-name-${index}`);
    const name = nameInput.value.trim();
    if (!name) {
        warningMessage.textContent = getTranslation("volunteerNameRequired");
        warningMessage.classList.add("show");
        return;
    }

    const event = events[index];
    if (!event || !event.volunteerShift) {
        return;
    }

    const signups = Array.isArray(event.volunteerShift.signups)
        ? event.volunteerShift.signups
        : [];
    if (signups.length >= event.volunteerShift.required) {
        return;
    }

    signups.push(name);
    event.volunteerShift.signups = signups;
    warningMessage.classList.remove("show");
    saveEvents();
    searchEvents();
}

// ==================== SEARCH FUNCTION ====================
// This function filters events by name or date as the user types
function searchEvents() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedFeatures = Array.from(accessibilityFilters)
        .filter(input => input.checked)
        .map(input => input.value);
    const filteredEvents = events.filter(event => {
        const searchableText = [
            event.name,
            event.date,
            event.location,
            event.category,
            event.description
        ].filter(Boolean).join(" ").toLowerCase();
        const searchMatch = searchableText.includes(searchTerm);
        const eventAccessibility = Array.isArray(event.accessibility) ? event.accessibility : [];
        const accessibilityMatch = selectedFeatures.every(feature => eventAccessibility.includes(feature));

        return searchMatch && accessibilityMatch;
    });

    displayEvents(filteredEvents);
}

// ==================== EVENT LISTENERS ====================
// These listen for user actions and run functions when they happen

// When the form is submitted (user clicks "Add Event")
eventForm.addEventListener("submit", addEvent);
cancelEditButton.addEventListener("click", resetEventForm);

// When user types in the search box
searchInput.addEventListener("input", searchEvents);
accessibilityFilters.forEach(filter => filter.addEventListener("change", searchEvents));
languageSelect.addEventListener("change", () => {
    currentLanguage = languageSelect.value;
    localStorage.setItem("eventHorizonLanguage", currentLanguage);
    applyLanguage();
});

window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);

// ==================== INITIALIZE (Run when page loads) ====================
// This code runs when the page first loads
sortEventsByDate();
applyLanguage();
registerServiceWorker();
