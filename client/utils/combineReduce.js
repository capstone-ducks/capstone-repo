function combineReduce (a,b,c,d){
    let tmp = a.concat(b,c,d);
    let result = tmp.reduce((unique, curr) => {
        if(!unique.some(user => user.id === curr.id)) {
            unique.push(curr);
        }
        return unique;
    },[]);
    return result;
};

module.exports = combineReduce;