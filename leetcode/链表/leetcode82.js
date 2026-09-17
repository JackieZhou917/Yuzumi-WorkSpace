/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    let cur = head
    while(cur.next) {
        if(cur.val == cur.next.val){
            deleteNextNode(cur)
        }
        cur = cur.next
    }
    return head
};

function deleteNextNode(head) {
    head.next = head.next.next
}