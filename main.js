let input = [
    {name: 'a', report_to: 'd'},
    {name: 'b', report_to: 'd'},
    {name: 'c', report_to: 'd'},
    {name: 'd', report_to: 'e'},
    {name: 'e', report_to: 'f'},
]

class Node {
    constructor(name, child) {
        this.name = name;
        if (child) {
            this.children = [child];
        } else {
            this.children = [];
        }
    }
    addChild(child) {
        this.children.push(child);
    }
}

function generateTree(input) {
    let root = null;
    let nodeMap = {};
    for (item of input) {
        let childNode = nodeMap[item.name];
        if (!childNode) {
            childNode = new Node(item.name, null);
            nodeMap[item.name] = childNode;
        }

        let parentNode = nodeMap[item.report_to];
        if (!parentNode) {
            parentNode = new Node(item.report_to, childNode);
            nodeMap[parentNode.name] = parentNode;
        } else {
            parentNode.addChild(childNode);
        }

        if (root == null || root.name == childNode.name) {
            root = parentNode;
        }
    }

    return root;
}

function printTreeTraversalsPreOrder(root, indent=2) {
    const blanks = ' '.repeat(indent);
    console.log(`${blanks}{`);
    console.log(`${blanks}name:${root.name}`);
    if (root.children.length == 0) {
        console.log(`${blanks}}`);
        return;
    }
    console.log(`${blanks}children:[`);
    indent += 2;
    for (item of root.children) {
        printTreeTraversalsPreOrder(item, indent);
    }
    console.log(`${blanks}]`);
    console.log(`${blanks}}`);
}

const tree = generateTree(input);
printTreeTraversalsPreOrder(tree);