Vue.component('animal-item', {
    props: ['animal'],
    template:'<tr>\n\t<td>{{ animal.id }}</td>\n\t<td>{{ animal.name }}</td>\n\t<td>{{ animal.species }}</td>\n\t'+
    '<td><a class="btn-small" :animal-id="animal.id" v-on:click="onDeleteButtonClick"><i class="material-icons left">delete</i></a></td>\n</tr>',
    methods: {
        onDeleteButtonClick: function(data) {
            if (this.$parent.url != null && this.$parent.url.length > 0) {
                if (this.$parent.url.charAt(this.$parent.url.length-1) != '/') {
                    this.$parent.url += "/";
                }
                fetch(this.$parent.url + "animal/id/" + data.currentTarget.getAttribute("animal-id"), {
                    method: "DELETE",
                    credentials: "include"
                })
                    .then(()=>{
                        this.$parent.refresh();
                    })
                    .catch(error=>console.error(error));
            }
        }
    }
})

var app = new Vue({
    el: "#app-container",
    data: {
        message: "Test",
        url: "http://localhost:8080/",
        animals: [],
        newAnimalName: null,
        newAnimalSpecies: null,
        editAnimalId: null,
        editAnimalName: null,
        editAnimalSpecies: null,
        username: null,
        password: null
    },
    methods: {
        refresh: function() {
            if (this.url != null && this.url.length > 0) {
                if (this.url.charAt(this.url.length-1) != '/') {
                    this.url += "/";
                }
                fetch(this.url+ "animal/list",  {
                    credentials: "include"
                })
                    .then(response=>response.json())
                    .then(responseJson=> {
                        if (responseJson != null && responseJson instanceof Array) {
                            this.animals = responseJson;
                        }
                    })
                    .catch(error=>console.error(error));
            }
        },
        onRefreshButtonClick: function() {
            this.refresh();
        },
        onInsertFormSubmit: function(data) {
            if (this.newAnimalName == null || this.newAnimalName.length == 0) {
                window.alert("Name must not be empty");
                return;
            }
            if (this.newAnimalSpecies == null || this.newAnimalSpecies.length == 0) {
                window.alert("Species must not be empty");
                return;
            }
            if (this.url != null && this.url.length > 0) {
                if (this.url.charAt(this.url.length-1) != '/') {
                    this.url += "/";
                }
                fetch(this.url+ "animal/insert", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        name: this.newAnimalName,
                        species: this.newAnimalSpecies
                    })
                })
                    .then(()=>{
                        this.refresh();
                        setTimeout(function() {
                            data.target.reset();
                        },250);
                    })
                    .catch(error=>console.error(error));
            }
        },
        onEditFormSubmit: function(data) {
            if (this.editAnimalId == null || this.editAnimalId <= 0) {
                window.alert("Animal ID must be greater than 0!");
                return;
            }
            if (this.editAnimalName == null || this.editAnimalName.length == 0) {
                window.alert("New name must not be empty");
                return;
            }
            if (this.editAnimalSpecies == null || this.editAnimalSpecies.length == 0) {
                window.alert("New species must not be empty");
                return;
            }
            if (this.url != null && this.url.length > 0) {
                if (this.url.charAt(this.url.length-1) != '/') {
                    this.url += "/";
                }
                fetch(this.url+ "animal/id/" + this.editAnimalId, {
                    method: "PUT",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        name: this.editAnimalName,
                        species: this.editAnimalSpecies
                    })
                })
                    .then(()=>{
                        this.refresh();
                        setTimeout(function() {
                            data.target.reset();
                        },500);
                    })
                    .catch(error=>console.error(error));
            }
        },
        onLoginSubmit: function(data) {
            if (this.username == null || this.username.length == 0) {
                window.alert("Username must not be empty");
                return;
            }
            if (this.password == null || this.password.length == 0) {
                window.alert("Password must not be empty");
                return;
            }
            if (this.url != null && this.url.length > 0) {
                if (this.url.charAt(this.url.length-1) != '/') {
                    this.url += "/";
                }
                var formData = new FormData();
                formData.append("username",this.username);
                formData.append("password",this.password);
                fetch(this.url+ "login", {
                    method: "POST",
                    credentials: "include",
                    body: formData
                })
                    .then(()=>{
                        this.refresh();
                        setTimeout(function() {
                            data.target.reset();
                            this.username = null;
                            this.password = null;
                        },500);
                    })
                    .catch(error=>console.error(error));
            }
        }, 
        onLogoutButtonClick: function() {
            if (this.url != null && this.url.length > 0) {
                if (this.url.charAt(this.url.length-1) != '/') {
                    this.url += "/";
                }
                fetch(this.url+ "logout", {
                    credentials: "include"
                })
                    .then(()=>{
                        this.animals = [];
                    })
                    .catch(error=>console.error(error));
            }
        }
    }
});