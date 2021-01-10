const util = require('../app/plugins/utility');

const argv = process.argv;
const argc = argv.length;

const date = argc > 2 ? argv[2] : util.toDateInput(new Date());

console.log(date);

console.log('Connecting to the MongoDB...');
const models = require('../app/models');
models.mongoose
  .connect(models.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(async() => {
    console.log('Connected to the MongoDB!');

    const locations = [];
    for (const location of await models.Location.find()) {
      location.enters = [];
      location.exits = [];

      const gates = await models.Gate.find({ locationId: location.id });
      for (const gate of gates) {
        if (gate.type === 'enter') {
          location.enters.push(gate);
        } else {
          location.exits.push(gate);
        }
      };

      if (location.enters.length > 0 && location.exits.length > 0) {
        locations.push(location);
      }
    }

    console.log('Available locations:');
    for (const location of locations) {
      console.log(`  ${location.name}`);
    }

    for (const visitor of await models.Visitor.find()) {
      const card = await models.Card.findById(visitor.cardId);
      if (card && card.validityDate === date) {
        await models.Visitation.deleteMany({ visitorId: visitor.id });

        console.log(`Processing ${visitor.name}`);

        const time = new Date(date);
        time.setHours(8);

        while (time.getHours() < 16) {
          const location = util.randomChoose(locations);

          let minuteNow = time.getHours() * 60 + time.getMinutes();
          minuteNow += util.randomRange(20, 80);

          time.setHours(Math.floor(minuteNow / 60));
          time.setMinutes(minuteNow % 60);

          console.log(`  ${util.toTimeInput(time)} entering ${location.name}`);

          let enterVisitation = new models.Visitation({
            visitorId: visitor.id,
            gateId: util.randomChoose(location.enters).id,
            timestamp: util.toDateTimeInput(time),
          });

          minuteNow = time.getHours() * 60 + time.getMinutes();
          minuteNow += util.randomRange(20, 80);

          time.setHours(Math.floor(minuteNow / 60));
          time.setMinutes(minuteNow % 60);

          let exitVisitation = new models.Visitation({
            visitorId: visitor.id,
            gateId: util.randomChoose(location.exits).id,
            timestamp: util.toDateTimeInput(time),
          });

          enterVisitation.save(enterVisitation);
          exitVisitation.save(exitVisitation);

          time.setHours(Math.floor(minuteNow / 60));
          time.setMinutes(minuteNow % 60);
        }
      }
    }

    process.exit();
  })
  .catch((err) => {
    console.log('Cannot connect to the MongoDB!', err);
    process.exit();
  });
