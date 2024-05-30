function namify(users) {
  let names = [];
    users.forEach(user => {
        if(user.name){
            names.push(user.name);
        }
    })
    return names;
}
