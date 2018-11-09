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