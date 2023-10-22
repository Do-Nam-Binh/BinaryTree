class Node {
  constructor(value) {
    this.value = value || null;
    this.left = null;
    this.right = null;
  }
}

const buildTree = function (arr, start, end) {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);

  const tempRoot = new Node(arr[mid]);
  tempRoot.left = buildTree(arr, start, mid - 1);
  tempRoot.right = buildTree(arr, mid + 1, end);

  return tempRoot;
};

class Tree {
  constructor(arr) {
    let uniq;
    if (Array.isArray(arr)) {
      uniq = [
        ...new Set(
          arr.sort(function (a, b) {
            return a - b;
          })
        ),
      ];
    }

    this.root = buildTree(uniq, 0, uniq.length - 1);
  }

  insert(value, currentNode = this.root) {
    if (currentNode == null) {
      return new Node(value);
    }
    if (currentNode.value == value) {
      return currentNode;
    }
    if (currentNode.value < value) {
      currentNode.right = this.insert(value, currentNode.right);
    } else {
      currentNode.left = this.insert(value, currentNode.left);
    }
    return currentNode;
  }

  delete(value, currentNode = this.root) {
    if (currentNode.value == null) return currentNode;

    if (currentNode.value == value) {
      currentNode = this.deleteNodeParser(currentNode);
    } else if (currentNode.value < value) {
      currentNode.right = this.delete(value, currentNode.right);
    } else {
      currentNode.left = this.delete(value, currentNode.left);
    }
    return currentNode;
  }

  deleteNodeParser(currentNode) {
    if (currentNode.left && currentNode.right) {
      const successorNode = this.findDeleteNode(currentNode.right);
      currentNode.value = successorNode.value;
      currentNode.right = this.delete(successorNode.value, currentNode.right);
      return currentNode;
    } else {
      const replaceNode = currentNode.left || currentNode.right;
      currentNode = null;
      return replaceNode;
    }
  }

  findDeleteNode(currentNode) {
    let tempNode = currentNode;
    while (tempNode.left != null) {
      tempNode = tempNode.left;
    }
    return tempNode;
  }

  find(value, temp = this.root) {
    if (temp.value == value) {
      return temp;
    }

    if (temp.value < value) {
      temp = this.find(value, temp.right);
    } else {
      temp = this.find(value, temp.left);
    }
    return temp;
  }

  levelOrder(callbackFn) {
    const queue = [this.root];
    const valueArr = [];
    while (queue.length > 0) {
      const node = queue.shift();

      callbackFn ? callbackFn(node) : valueArr.push(node.value);

      const enqueueArr = [node?.left, node?.right].filter((value) => value);
      queue.push(...enqueueArr);
    }
    if (valueArr.length > 0) return valueArr;
  }

  inorder(callbackFn, currentNode = this.root, nodeArr = []) {
    if (currentNode == null) {
      return;
    }

    this.inorder(callbackFn, currentNode.left, nodeArr);

    nodeArr.push(currentNode);
    if (callbackFn) {
      callbackFn(currentNode);
    }

    this.inorder(callbackFn, currentNode.right, nodeArr);
    const valueArr = [];

    nodeArr.forEach((node) => {
      valueArr.push(node.value);
    });

    return valueArr;
  }

  preorder(callbackFn, currentNode = this.root, nodeArr = []) {
    if (currentNode == null) {
      return;
    }
    nodeArr.push(currentNode);
    if (callbackFn) {
      callbackFn(currentNode);
    }
    this.preorder(callbackFn, currentNode.left, nodeArr);
    this.preorder(callbackFn, currentNode.right, nodeArr);
    const valueArr = [];
    nodeArr.forEach((node) => {
      valueArr.push(node.value);
    });

    return valueArr;
  }

  postorder(callbackFn, currentNode = this.root, nodeArr = []) {
    if (currentNode == null) {
      return;
    }

    this.postorder(callbackFn, currentNode.left, nodeArr);
    this.postorder(callbackFn, currentNode.right, nodeArr);
    nodeArr.push(currentNode);
    if (callbackFn) {
      callbackFn(currentNode);
    }
    const valueArr = [];
    nodeArr.forEach((node) => {
      valueArr.push(node.value);
    });

    return valueArr;
  }

  height(currentNode = this.root) {
    if (currentNode == null) {
      return 0;
    } else {
      const leftHeight = this.height(currentNode.left);
      const rightHeight = this.height(currentNode.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  depth(node, currentNode = this.root) {
    if (currentNode == null) return -1;

    let dist = -1;

    if (
      currentNode.value == node.value ||
      // Otherwise, check if x is
      // present in the left subtree
      (dist = this.depth(node, currentNode.left)) >= 0 ||
      // Otherwise, check if x is
      // present in the right subtree
      (dist = this.depth(node, currentNode.right)) >= 0
    )
      // Return depth of the node
      return dist + 1;

    return dist;
  }

  isBalanced() {
    const leftHeight = this.height(this.root.left);
    const rightHeight = this.height(this.root.right);
    if (Math.abs(leftHeight - rightHeight) <= 1) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    const arr = this.preorder();
    this.root = buildTree(
      arr.sort(function (a, b) {
        return a - b;
      }),
      0,
      arr.length - 1
    );
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

//Create binary tree
const binaryTree = new Tree([21, 33, 99, 42, 87, 34, 22, 37, 88, 76]);

//Confirm tree is balanced
console.log("Is balanced? ", binaryTree.isBalanced());

//Level order traversal
console.log("Level order: ", binaryTree.levelOrder());

//Preorder traversal
console.log("Preorder: ", binaryTree.preorder());

//Postorder traversal
console.log("Postorder: ", binaryTree.postorder());

//Inorder traversal
console.log("Inorder: ", binaryTree.inorder());

//Insert more
binaryTree.insert(122);
binaryTree.insert(110);
binaryTree.insert(200);
binaryTree.insert(322);

//Confirm tree balance
console.log("Is balanced? ", binaryTree.isBalanced());

//Rebalance tree
binaryTree.rebalance();
console.log("Rebalanced tree");

//Confirm tree balance
console.log("Is balanced? ", binaryTree.isBalanced());

//Level order traversal
console.log("Level order: ", binaryTree.levelOrder());

//Preorder traversal
console.log("Preorder: ", binaryTree.preorder());

//Postorder traversal
console.log("Postorder: ", binaryTree.postorder());

//Inorder traversal
console.log("Inorder: ", binaryTree.inorder());
