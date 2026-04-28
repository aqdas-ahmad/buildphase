const Announcement = require('../models/Announcement');

// @desc    Get activity feed (announcements)
// @route   GET /api/activities
// @access  Public
const getActivities = async (req, res, next) => {
  try {
    let news = await Announcement.find().sort({ createdAt: -1 });
    
    if (news.length === 0) {
      news = await Announcement.insertMany([
        {
          tag: "Sicherheit",
          title: "Neue Sicherheitsrichtlinien für Baustellenbesuche",
          date: "Vor 2 Stunden",
          excerpt: "Ab sofort gelten erweiterte Sicherheitsvorkehrungen für alle Mitarbeiter...",
          variant: "danger"
        },
        {
          tag: "Unternehmen",
          title: "Quartalsergebnisse Q1 und Ausblick",
          date: "Heute",
          excerpt: "Die DLC Bau Gruppe verzeichnet ein starkes erstes Quartal...",
          variant: "success"
        }
      ]);
    }
    
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

module.exports = { getActivities };
