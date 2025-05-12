let events = [
  {
    title: "🔥 <span class='title'>Grind the Beef</span>",
    description: "Rack up as many achievements as possible in a selected community game. Whether it's a pixel roguelike or a corporate sim, you've got 24 hours to become a beast. Screenshot your progress. Brag. Climb the leaderboard. ",
    date: "May 27, 2025",
    location: "online",
    imageUrl: "images/achievements_img.png",
  },
  {
    title: "🧂 <span class='title'>Salt the Beef</span>",
    description: "It's modding mayhem. Throw together a cursed modpack, upload the results, and compare for Most Broken, Most Hilarious and Most Impressive. Clip your creations or share screenshots, and make the judges weep. ",
    date: "May 28, 2025",
    location: "online",
    imageUrl: "images/coding_img.jpg",
  },
  {
    title: "🔪 <span class='title'>Slice the Beef</span>",
    description: "A LAN-style PvP tournament where sweat and chaos collide. Game will be revealed 2 days beforehand. Signups open soon. Only one will walk away with the crown... and the beaf cleaver role. ",
    date: "May 29, 2025",
    location: "our esports room",
    imageUrl: "images/slice_the_beef.jpg",
  },
  {
    title: "💸 <span class='title'>Sell the Beef</span>",
    description: "Submit the most absurd, dramatic, or unhinged out-of-context gaming clip you've got. No setup. No story. Just vibes. The community will vote for their favorite, and the top clip becomes site canon.",
    date: "May 30, 2025",
    location: "online",
    imageUrl: "images/gaming_img.jpg",
  }
];

let contactors = [];

/**
 * @import { Express } from "express";
 * @param { Express } app
 */
export default function setPageRoutes(app) {
  // Updated home route with previousWinner data:
  app.get(['/', '/home', '/index'], (req, res) => {
    const previousWinner = {
      name: "Jimmy McBeef",
      event: "Beef Jerky Challenge",
    };
    const activePlayers = 575;
    res.render('layout', {
      contentPath: 'pages/home',
      pageTitle: 'Home',
      events,
      previousWinner,
      activePlayers,
    });
  });

  app.get('/about', (req, res) => {
    res.render('layout', {
      contentPath: 'pages/about',
      pageTitle: 'About',
      about: {
        mission: "We arrange gaming events with everyone that has a free Sunday, including snacks, music, and some LAN. The esports competitions can get very competitive and fun, so do bring yourself some popcorn if you decide to join in person or on our livestreams!",
        eventsHosted: 42,
        gamesCount: 137,
        team: [
          { name: "Brian Felgate", role: "600504" },
          { name: "Cayden Frank", role: "578131" },
          { name: "Estian Stander", role: "600899" },
          { name: "Janco Nieuwoudt", role: "600175" }
        ]
      }
    });
  });

  app.get('/events', (req, res) => {
    res.render('layout', {
      contentPath: 'pages/events',
      pageTitle: 'Events',
      events,
    });
  });

  app.get('/contact', (req, res) => {
    res.render('layout', {
      contentPath: 'pages/contact',
      pageTitle: 'Contact',
    });
  });

  app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    console.log("Got contact info:", name, email, message);
    contactors.push({ name, email, message });

    res.json({ success: true, received: { name, email, message } });
  });

  app.get('/thankyou', (req, res) => {
    res.render('layout', {
      contentPath: 'pages/thankyou',
      pageTitle: 'Thank You',
      name: req.query.name,
    });
  });

  app.get('/test', (req, res) => {
    res.render('pages/test');
  });
}