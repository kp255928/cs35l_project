const router = require('express').Router();
let Event = require('../datamodel/events');

router.route('/').get((req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});
//For later: change the route to activate this if the user clicked "add event"
router.route('/add').post((req, res) => {
    const username = req.body.username;
    //const description = req.body.description;
    const sdate = req.body.sdate;
    const stime = req.body.stime;
    const edate = req.body.edate;
    const etime = req.body.etime;
    const eventname = req.body.eventname;

    const newEvent = new Event({
        sdate,
        stime,
        edate,
        etime,
        eventname,
        username
    });

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

//delete by event id

router.route('/search').get(async (req, res) => {
    const event = await Event.find({eventname: req.body.eventname})
    if (!event){
        return res.status(400).json('Event not found.')
    }
    return res.json(event)
})

//search by eventname

//Update event: No need to send all the fields, only those that need to be updated

router.route('/update/:id').post(async (req, res) => {
    const {
        sdate,
        stime,
        edate,
        etime,
        eventname,
        username
    } = req.body;
    
    const eventFields= {};
    eventFields.id = req.params.id;
    if (sdate) eventFields.sdate = sdate.trim();
    if (stime) eventFields.stime = stime.trim();
    if (edate) eventFields.edate = edate.trim();
    if (etime) eventFields.etime = etime.trim();
    if (eventname) eventFields.eventname = eventname.trim();
    if (username) eventFields.username = username.trim();


    let event = await Event.findById(req.params.id);
    if (!event){
        return res.status(400).json('No such event.')
    }
    try {
        event = await Event.findByIdAndUpdate(
            req.params.id,
            {$set: eventFields},
            {new: true}
        );

        return res.json("Event updated successfully");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    } 
})

/*
router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Event.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
*/
module.exports = router;