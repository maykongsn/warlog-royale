const { Router } = require('express');
const axios = require('axios');

const router = Router();

router.get("/", async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    };

    const participants = await axios.get(
      "https://api.clashroyale.com/v1/clans/CLANTAG/currentwar",
      config
    );

    const members = await axios.get(
      "https://api.clashroyale.com/v1/clans/CLANTAG/members",
      config
    );

    var participantsName = [];
    for(var i = 0; i < participants.data.participants.length; i++) {
      participantsName.push(participants.data.participants[i].name);
    }

    var membersName = [];
    for(var i = 0; i < members.data.items.length; i++) {
      if(members.data.items[i].expLevel >= 8) {
        membersName.push(members.data.items[i].name);
      }
    }
    
    var notParticipating = [];
    for(var i = 0; i < membersName.length; i++) {
      if(participantsName.indexOf(membersName[i]) == -1) {
        notParticipating.push(membersName[i]);
      }
    }
    console.log(notParticipating);
    res.json(notParticipating);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
