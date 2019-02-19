var sid = {
    init: function() {
        this.getEvents();
    },
    getEvents: function() {
        $('.step1 button').click((function() {
            this.smileId();
        }).bind(this))
    },
    requestAuthorization: function(payload) {

        return new Promise(function(resolve, reject) {
            var options = {
                "url": "https://etrust-sandbox.electronicid.eu/v2/smileid.request",
                "headers": {
                    "authorization": "Bearer 01c7e2b0-f8e2-475d-a44b-2673c12ffff7",
                    "content-type": "application/json"
                },
                "async": true,
                "crossDomain": true,
                "method": "POST",
                "processData": false,
                "data": JSON.stringify(payload ? payload : {})
            };
            var request = new XMLHttpRequest();
            request.open(options.method, options.url, true);

            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('Authorization', 'Bearer 01c7e2b0-f8e2-475d-a44b-2673c12ffff7');

            request.onload = function() {
                if (request.status >= 200 && request.status < 400)
                    resolve(JSON.parse(request.responseText));

                else
                    reject(request);
            };

            request.onerror = function() {
                reject(request);
            };

            request.send(options.method === "POST" ? options.data : null);
        });
    },
    finish: function() {
        $('.step2').hide();
        $('.step3').show();
    },
    smileId: function() {
      

        this.requestAuthorization({ /*process:'Attended', */ rauthorityId: 'ebfb5e54-16c9-424d-9cbf-f9b5f93dec27' }).then(function(response) {
            $('.step1').hide();
            $('.step2').show();
            console.log('authorization', response.authorization)
            $.ajaxSetup({ headers: { authorization: response.authorization, "Content-Type": 'application/json' } });
            var smileId = EID.smileId('#video', {
                lang: 'en',
                eidApi: 'https://etrust-sandbox.electronicid.eu/v2/',
            })
            smileId.turnOn() /*.then((res)=>{*/
            smileId.start({ authorization: response.authorization })
            /*});*/
            smileId.on('completed', ((video) => {
                $('.step2').hide();
                $('.step3').show();
            }).bind(this));
        });


    }
}
$(document).ready(function() {
    sid.init();
});