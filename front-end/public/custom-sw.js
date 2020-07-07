self.addEventListener("push", e => {
    const title = e.data.json().title;
    const content = e.data.json().content;
    self.registration.showNotification(title, {
        body: content,
        icon: "https://banner2.kisspng.com/20171217/8a2/envelope-png-5a3744625f6bf9.6827994515135714263909.jpg",
        tag: '1',
        data: 'Hello there'
    });
});