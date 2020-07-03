const User = require("../models").User;
const dotenv = require('dotenv');
const webpush = require('web-push');

dotenv.config();

const subscribe = (req, res) => {
    const subscription = req.body.subscription;
    User.findOne({
        where: {
            endpoint: subscription.endpoint,
            p256: subscription.keys.p256dh,
            auth: subscription.keys.auth
        },
        raw: true
    }).then((result) => {
        if (!result) {
            userNotificationsDetails = {
                endpoint: subscription.endpoint,
                p256: subscription.keys.p256dh,
                auth: subscription.keys.auth
            }

            User.update(
                userDetails,
                {
                    where:
                        { id: req.body.user_id }
                }
            )
                .then(res.status(200).send({ message: "V-ati abonat pentru notificari." }));
        } else {
            res.status(200).send({ message: "V-ati abonat pentru notificari." });
        }
    });
}

const send = async (req, res) => {

    //resolve request because the next jobs doesn't depend on it
    res.status(200).send();

    let subscriptionReceived = req.body;

    //the payload will contain data to be displayed inside the notification
    const payload = JSON.stringify({ title: "Testing push" });

    let users = await User.findAll({ raw: true });

    users.forEach(user => {

        let keys = { p256dh: user.p256, auth: user.auth };
        let subscription = { endpoint: user.endpoint, expirationTime: null, keys: keys };

        webpush
            .sendNotification(subscription, payload)
            .catch(err => console.error(err));

    })
};

module.exports = {
    subscribe,
    send,
}