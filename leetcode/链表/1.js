// const list = {
//     val: 1,  // 值域
//     next: {  // 指针域
//         val: 2,
//         next: null,
//     }
// }

// list.val
// list.next.val
// list.next.next.val

function ListNode(val) {
    this.val = val ? val: null
    this.next = null
}
const node1 = new ListNode(1)  // {val: 1, next: {}}
const node2 = new ListNode(2)
node1.next = node2
const node3 = new ListNode(3)
node3.next = node2
node1.next = node3

console.log(node1)