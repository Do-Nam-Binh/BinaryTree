class Node {
  constructor(value) {
    this.value = value || null;
    this.left = null;
    this.right = null;
  }

  updateLeft(node) {
    this.left = node;
  }

  updateRight(node) {
    this.right = node;
  }

  getLeft() {
    return this.left;
  }

  getRight() {
    return this.right;
  }

  getData() {
    return this.value;
  }
}

const buildTree = function (arr, start, end) {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);

  const tempRoot = new Node(arr[mid]);
  tempRoot.updateLeft(buildTree(arr, start, mid - 1));
  tempRoot.updateRight(buildTree(arr, mid + 1, end));

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

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.getRight() !== null) {
      this.prettyPrint(
        node.getRight(),
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getData()}`);
    if (node.getLeft() !== null) {
      this.prettyPrint(
        node.getLeft(),
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
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
