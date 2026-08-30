var LRUCache = function(capacity) {
    this.data = {

    }  // 存储数据
    this.max = capacity  // 最大容量

    this.keyArr = []  // key 的使用情况
};

LRUCache.prototype.updateKey = function(key) { // 更新 key 的地位
    // 找到这个key的下标
    const index = this.keyArr.indexOf(key)
    if(index != -1) {
        this.keyArr.splice(index, 1)
        this.keyArr.push(key) // 更新了位置
    }
}

LRUCache.prototype.get = function(key) {
    
    this.updateKey(key)
    // if (this.data[key] !== undefined) {
    //     return this.data[key]
    // }
    // return -1
    return this.data[key] !== undefined ? this.data[key] : -1
};


LRUCache.prototype.put = function(key, value) {
    const idx = this.keyArr.indexOf(key)

    if(idx !== -1) {
        // 如果存在，先把原来的位置删掉
        this.keyArr.splice(idx, 1)
    }

    // 不管原来存不存在，
    // put 之后它都是最近使用的
    this.keyArr.push(key)

    this.data[key] = value

    if(this.keyArr.length > this.max) {
        delete this.data[this.keyArr[0]]
        this.keyArr.shift()
    }
};


