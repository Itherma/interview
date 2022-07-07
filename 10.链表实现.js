/** 链表的节点可以是任何类型数据，但是需要包括数据域和指针域 */

// 实现链表

const head = [1, 2, 3, 4, 5];

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * 节点 + 指针
 */

function LinkList(arr) {
  function getLastNode(head) {
    let next = head.next || head;
    while (next && next.next) {
      next = next.next;
    }
    return next;
  }
  const head = new ListNode(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    const lastNode = getLastNode(head);
    console.log(lastNode);
    lastNode.next = new ListNode(arr[i]);
  }
  return head;
}

console.log(JSON.stringify(LinkList(head)));

// {"val":1,"next":{"val":2,"next":{"val":3,"next":{"val":4,"next":{"val":5,"next":null}}}}}
