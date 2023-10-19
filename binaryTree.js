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
    if (currentNode.value != value) {
      if (currentNode.value < value) {
        currentNode.right = this.insert(value, currentNode.right);
      } else {
        currentNode.left = this.insert(value, currentNode.left);
      }
      return currentNode;
    } else {
      return currentNode;
    }
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

let binaryTree = new Tree([1, 234, 44, 2, 66, 34, 2, 34]);
console.log(
  [...new Set([1, 234, 44, 2, 66, 34, 2, 34])].sort(function (a, b) {
    return a - b;
  })
);
console.log(binaryTree.root);
binaryTree.prettyPrint();
binaryTree.insert(13);
binaryTree.insert(14);
binaryTree.insert(13);
binaryTree.insert(2);
binaryTree.prettyPrint();
