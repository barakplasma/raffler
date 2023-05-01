// run this in an authenticated browser session on meetup.com
// from https://www.meetup.com/vue-js/events/292584374/attendees/
const res = await fetch("https://www.meetup.com/mu_api/urlname/events/eventId/attendees?queries=%28endpoint%3Avue-js%2Fevents%2F292584374%2Frsvps%2Cmeta%3A%28method%3Aget%29%2Cparams%3A%28desc%3A%21t%2Cfields%3A%27answers%2Cpay_status%2Cself%2Cweb_actions%2Cattendance_status%27%2Conly%3A%27answers%2Cresponse%2Cattendance_status%2Cguests%2Cmember%2Cpay_status%2Cupdated%27%2Corder%3Atime%29%2Cref%3AeventAttendees_vue-js_292584374%2Ctype%3Aattendees%29", {
    headers: {
        "x-meetup-activity": "standardized_url=%2Furlname%2Fevents%2FeventId%2Fattendees&standardized_referer=undefined",
    },
    referrer: "https://www.meetup.com/vue-js/events/292584374/attendees/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
});

const json = await res.json()

const people = json.responses[0].value

const directus_format = people.map((p)=>{
    return {
        full_name: p.member.name,
        photo_url: p.member?.photo?.highres_link || p.member?.photo?.photo_link,
        profile_url: p.member.web_actions.group_profile_link
    };
}
);

directus_format
