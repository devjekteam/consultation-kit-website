function consultationKitDemo() {
    var addHour = function (date, amount) {
        return new Date(date.valueOf() + amount * (1000 * 60 * 60));
    };
    var toNearestHour = function (date) {
        return new Date(date.valueOf() - (date.valueOf() % (1000 * 60 * 60)));
    };

    var createFakeEvents = function (amount) {
        var firstDate = toNearestHour(new Date());

        var times = [];

        for (var i = 0; i < amount; i++) {
            times.push({
                start: addHour(firstDate, i).toISOString(),
                end: addHour(firstDate, i + 1).toISOString()
            });
        }
        return {data: times};
    };

    flBooking({
        targetEl: document.querySelector('#demo'),
        name: 'Book a 1hr consultation',
        email: 'dan@consultationkit.com',
        timezone: {
            timezone: 'America/New_York',
            utc_offset: -5
        },
        bookingFields: {
            name: {
                placeholder: 'Full name',
                prefilled: false,
                locked: false
            },
            email: {
                placeholder: 'E-mail',
                prefilled: false,
                locked: false
            },
            phone: {
                enabled: true,
                placeholder: 'Phone number',
                prefilled: false,
                required: true,
                locked: false
            },
            voip: {
                enabled: true,
                placeholder: 'Skype username',
                prefilled: false,
                required: true,
                locked: false
            },
            comment: {
                enabled: false
            }
        },
        localization: {
            showTimezoneHelper: true,
            timeDateFormat: '12h-mdy-sun',
            strings: {
                submitText: 'Book',
                successMessageTitle: 'Booking Complete',
                successMessageBody: 'Thanks for checking out Consultation Kit! Want a user-friendly, timezone-aware ' +
                'booking calendar that accepts payments for your website? Signup below!',
                timezoneHelperLoading: 'Loading..',
                timezoneHelperDifferent: 'Your timezone is %s hours %s (calendar shown in your local time)',
                timezoneHelperSame: 'You are in the same timezone'
            }
        },
        avatar: 'images/demo-consultant.jpg',
        createBooking: function (data) {
            ga('send', 'event', 'Booking Created');

            return Promise.resolve(data)
        }, // must return a promise
        getEvents: function (data) {
            return createFakeEvents(1000)
        },
        callbacks: {
            showBookingPage: function (slot) {
                console.log('showBookingPage', slot);
            }
        }
    });
}