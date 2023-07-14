const { Router } = require("express");
const axios = require("axios");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    };

    const warParticipants = await axios.get(
      `https://api.clashroyale.com/v1/clans/%23VGLQC02/currentriverrace`,
      config
    );

    const clanMembers = await axios.get(
      "https://api.clashroyale.com/v1/clans/%23VGLQC02/members",
      config
    );

    const participantsName = warParticipants.data.clan.participants.reduce(
      (participants, member) => {
        if (member.fame === 0) {
          participants.push(member.name);
        }
        return participants;
      },
      []
    );

    const membersName = clanMembers.data.items.map((member) => member.name);

    const notParticipating = participantsName.reduce((participants, member) => {
      if (membersName.indexOf(member) > -1) {
        participants.push(member);
      }
      return participants;
    }, []);

    res.json(notParticipating);
  } catch (error) {
    res.error(error.message);
  }
});

module.exports = router;
