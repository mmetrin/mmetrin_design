class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None
        self.prev = None
    
    def get_next_node(self):
        if self.next:
            return self.next

    def get_prev_node(self):
        if self.prev:
            return self.prev


def create_list_node(pattern: str) -> ListNode:
    if not pattern:
        return None
    prev = None
    initial = None
    for idx, item in enumerate(pattern):
        current_node = ListNode(item)
        if initial is None:
            initial = current_node
        if prev is not None:
            prev.next = current_node
            current_node.prev = prev
        prev = current_node
    return initial


class Solution:
    def validate_pattern(self, s: str, current_node):
        idx = 0
        while current_node:
            next_node = current_node.get_next_node()
            prev_node = current_node.get_prev_node()
            if idx == len(s):
                if current_node.val == "*":
                    current_node = next_node
                    continue
                if not next_node:
                    return False
                if next_node.val == "*":
                    current_node = current_node.next
                    continue
                return False
            
            if current_node.val == "*":
                if s[idx] == prev_node.val or prev_node.val == ".":
                    if self.validate_pattern(s[idx:], next_node):
                        current_node = next_node
                    else:
                        idx += 1
                    continue
                else:
                    current_node = next_node
                    continue
            if current_node.val == ".":
                current_node = next_node
                if not next_node or not next_node.val == "*":
                    idx += 1
                continue
            if current_node.val == s[idx]:
                if not (next_node and next_node.val == "*"):
                    idx += 1
                current_node = next_node
                continue
            if next_node and next_node.val != "*":
                return False
            current_node = next_node
        return idx == len(s)

    def isMatch(self, s: str, p: str) -> bool:
        if not p:
            return False
        pattern_list_node = create_list_node(p)
        return self.validate_pattern(s, pattern_list_node)

print(Solution().isMatch("aaa", "a.a"))