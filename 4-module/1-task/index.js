function makeFriendsList(friends) {
    let fullNames = friends.map(friend => `${friend.firstName} ${friend.lastName}`);
    let friendsList = document.createElement('ul');

    for(let i = 0; i < fullNames.length; i++){
        friendsList.innerHTML = friendsList.innerHTML + `<li>${fullNames[i]}</li>`;
    }

    return friendsList;
}
