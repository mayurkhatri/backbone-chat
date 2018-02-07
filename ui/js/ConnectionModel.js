var ConnectionModel = Backbone.Model.extend({
    defaults: {
        'color': '',
        'user': ''
    },
    initialize: function () {
        _.bindAll(this, 'save');
        this.on("change", this.save);
        if (sessionStorage && sessionStorage.cnxdata){
            // debugger
            // get the username and color for user from session and set for model to display for user
            this.set(JSON.parse(sessionStorage.cnxdata));
        }
    },
    save: function () {
        if (sessionStorage) {
            sessionStorage.cnxdata = JSON.stringify(this.toJSON());
        }
    }
});