function showSalary(users, age) {
  let result = '';
    let filtUsers = users.filter(user => user.age <= age);
    filtUsers.forEach(user => {
        if(filtUsers.indexOf(user) < filtUsers.length - 1){
            result = result + `${user.name}, ${user.balance}\n`;
        } else {
            result = result + `${user.name}, ${user.balance}`;
        }
    })
    return result;
}
