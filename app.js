$(function(){
    var model = {
        currentFriend: null,
        formOpen: false,
        friends: [
            {
                name: 'Jim',
                age: 35,
                email: 'jim@email.com'
            },
            {
                name: 'John',
                age: 33,
                email: 'John@email.com'
            },
            {
                name: 'Danny',
                age: 47,
                email: 'Danny@email.com'
            },
            {
                name: 'Pedro',
                age: 57,
                email: 'Pedro@email.com'
            },
            {
                name: 'David',
                age: 3,
                email: 'David@email.com'
            }
        ]
    };

    var controller = {
        init: function(){
            model.currentFriend = model.friends[0];
            friendsView.init();
            friendView.init();
            formView.init();
        },
        getFriends: function(){
            return model.friends;
        },
        getCurrentFriend: function(){
            return model.currentFriend;
        },
        setCurrentFriend: function(friend){
            model.currentFriend = friend;
        },
        isFormOpen: function(){
            return model.formOpen;
        },
        openForm: function(){
            model.formOpen = true;
        },
        closeForm: function(){
            model.formOpen = false;
        }
    };

    var friendsView = {
        init: function(){
            this.friendsList = document.getElementById('friends-list');
            console.log(this.friendsList);
            this.render();
        },
        render: function(){
            var friends = controller.getFriends();
            this.friendsList.innerHTML = '';
            console.log(friends);
            // this.friends.innerHTML='';

            for(var i=0; i<friends.length; i++){
                var friend = friends[i];

                var elem = document.createElement('li');
                elem.textContent = friend.name

                elem.addEventListener('click', (function(friend){
                    return function(){
                        controller.setCurrentFriend(friend);
                        friendView.render();
                    }
                })(friend));

                this.friendsList.appendChild(elem);
                // this.catListElem.appendChild(elem);
            }
        }
    }

    var friendView = {
        init: function(){
            this.friendName = document.getElementById('friend-view');
            this.friendAge = document.getElementById('age');
            this.friendEmail = document.getElementById('email');
            this.render();
        },
        render: function(){
            var currentFriend = controller.getCurrentFriend();
            this.friendName.textContent = currentFriend.name;
            this.friendAge.textContent = currentFriend.age;
            this.friendEmail.textContent = currentFriend.email;
        }
    }

    var formView = {
        init: function(){
            this.formView = document.getElementById('form-box');
            this.adminButton = document.getElementById('admin-button');

            this.adminButton.addEventListener('click', function(){
                controller.openForm();
                formView.render();
            });
            this.render();
        },
        render: function(){
            var isOpen = controller.isFormOpen();

            if (!isOpen){
                this.formView.style.display= "none";
            }else {
                this.formView.style.display = "block"
            }
        }
    }

    controller.init();
})