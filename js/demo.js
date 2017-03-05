function consultationKitDemo() {

    var addHour = function (date, amount) {
         return new Date(date.valueOf() + amount * (1000 * 60 * 60));
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
         console.log(times);
         return {data: times};
     };

    var addDay = function (date, amount) {
        return new Date(date.valueOf() + amount * (1000 * 60 * 60 * 24));
    };
    var toNearestHour = function (date) {
        return new Date(date.valueOf() - (date.valueOf() % (1000 * 60 * 60)));
    };

    function RFC3339DateString(d){
       function pad(n){return n<10 ? '0'+n : n}
       return d.getUTCFullYear()+'-'
            + pad(d.getUTCMonth()+1)+'-'
            + pad(d.getUTCDate())+'T'
            + pad(d.getUTCHours())+':'
            + pad(d.getUTCMinutes())+':'
            + pad(d.getUTCSeconds())+'Z'
    }

    function addToTimes(availabilities, times) {
        for (var i = 0; i < availabilities.length; i++) {
          times.push({
            start: availabilities[i].start_datetime,
            end: availabilities[i].end_datetime
          })
        }
    }

    function getAvailabilities(days, times) {
        var firstDate = toNearestHour(new Date());

        for (var i = 0; i < days; i++) {
          start_datetime = RFC3339DateString(addDay(firstDate, i))

          $.ajax({'url': 'http://localhost:5000/calendars/1/availabilities?start_datetime=' + start_datetime, 'type':'GET',
                  'headers': {
                    "authorization": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0ODkwMjk2MzUwMDAsInVzZXJfaWQiOjF9.ZKAou1oJ6aI93Wp7ooqSgTsQ65v97J22YGrBwvQf0cw'
                  },
                  success: function(result) {
                    addToTimes(result.availabilities, times)
                  }
                }
              );
        }
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
            // return {data: [{"start": "2017-03-09T14:00:00Z", "end": "2017-03-09T14:15:00Z"}]}
            let times = [];
            const availPromises = getAvailabilities(7, times);

            return $.when(availPromises).done(function() {
              console.log(times);
              return {data: times};
            });
        },
        callbacks: {
            showBookingPage: function (slot) {
                console.log('showBookingPage', slot);
            }
        }
    });
}
