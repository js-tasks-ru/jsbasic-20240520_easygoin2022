function showSalary(users, age) {
    let filtUsers = users.filter(user => user.age <= age);

    return filtUsers
    .map(user => `${user.name}, ${user.balance}`)
    .join('\n');
}
