/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    let head = new ListNode()
    let rear = head
    let i = list1, j = list2
    while (i && j) {
        if (i.val <= j.val) {
            rear.next = i
            i = i.next
        } else {
            rear.next = j
            j = j.next
        }
        rear = rear.next
    }
    if(i) {
        while(i) {
            rear.next = i
            i = i.next
            rear = rear.next
        }
    }
    if(j) {
        rear.next = j
            j = j.next
            rear = rear.next
    }

    return head.next
};