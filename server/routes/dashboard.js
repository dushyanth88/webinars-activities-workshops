import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// GET /api/dashboard-posts
router.get('/dashboard-posts', async (req, res) => {
    try {
        const events = await Event.find()
            .sort({ date: 1 }) // Sort by upcoming date
            .limit(10);

        const dashboardPosts = events.map(event => {
            let ctaLink = '/webinars';
            if (event.type === 'workshop') ctaLink = `/workshops?register=${event._id}`;
            if (event.type === 'internship') ctaLink = '/internships';


            return {
                id: event._id,
                type: event.type,
                title: event.type.charAt(0).toUpperCase() + event.type.slice(1),
                heading: event.title,
                description: event.description,
                bannerImage: event.imageUrl,
                date: new Date(event.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }),
                endDate: event.endDate ? event.endDate : null,
                startDateRaw: event.date,

                time: new Date(event.date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                ctaText: event.type === 'internship' ? 'Apply Now' : 'Register Now',
                ctaLink: ctaLink,
                createdAt: event.createdAt
            };
        });

        res.json(dashboardPosts);
    } catch (error) {
        console.error('Error fetching dashboard posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
