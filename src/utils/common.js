// 从数组移除元素
export function removeFromArray (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

export function addToArray(val) {
    var index = this.indexOf(val);
    if (index < 0) {
        this.push(val);
    }
};

export function getInCount(arr) {
    let count = 0;
    for(let i=0; i < arr.length; i++){
        let index = this.indexOf(arr[i]);
        if (index > -1) {
            count++;
        }
    }
    return count;
};