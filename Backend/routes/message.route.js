import express from "express"
const router = express.Router()


router.get('/messages', async (req, res) => {
    try {
      // Fetch the last 50 messages sorted by timestamp in descending order
      const messages = await Message.find()
        .sort({ timestamp: -1 })
        .limit(50);
  
      // Send the messages back as JSON
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

  export default router;