function containsChildNode(node) {
  for (let i = 0; i < node.childNodes.length; i++) {
    if (node.childNodes[i].nodeType == 1) return true;
  }
  return false;
}

function findLastWordIndex(content) {
  for (let i = content.length - 1; i > 0; i--) {
    if (content[i] != "") {
      return i;
    }
  }
  return false;
}

function findNodesToWidowBust(nodeList) {
  let nodesToVisit = nodeList;
  let nodesToWidowBust = new Set();

  while (nodesToVisit.length) {
    const currentNode = nodesToVisit.shift();
    nodesToWidowBust.add(currentNode);
    currentNode.childNodes.forEach(child => {
      if (isDomNode(child) && !nodesToVisit.includes(child)) {
        nodesToVisit.push(child);
      }
    });
  }
  return nodesToWidowBust;
}

function fixWidows(elements) {
  elements.forEach(element => {
    // if this element has children
    // only widow-bust text elements
    if (containsChildNode(element)) {
      fixWidowsInTextNodes(element);
    } else {
      // if this is the deepest node
      // it's safe to replace the innerHTML
      fixWidowInDomElement(element);
    }
  });
}

function fixWidowInDomElement(element) {
  const content = element.childNodes[0].nodeValue.trim().split(" ");
  if (content.length > 1) {
    const widow = "&nbsp;" + content.pop();
    element.innerHTML = content.join(" ") + widow;
  }
}

function fixWidowsInTextNodes(element) {
  // fix every child text node
  element.childNodes.forEach(child => {
    if (isTextNode(child)) {
      let content = child.nodeValue.split(" ");
      let nonBreakingSpace = "\xa0";

      if (content.length > 1) {
        // if there are trailing spaces
        // we need to find the last word
        // so we know where to insert a
        // non-breaking space
        if (content[content.length - 1] == "") {
          const indexOfLastWord = findLastWordIndex(content);
          // if there is no last word
          // this content is simply whitespace, indentation, etc.
          if (indexOfLastWord) {
            content.splice(indexOfLastWord, 0, nonBreakingSpace);
          }
        } else {
          // otherwise, place a non-breaking space
          // before the last word
          content.splice(-1, 0, nonBreakingSpace);
        }
        // manually join array to skip non-breaking-spaces
        const newContent = joinArray(content, nonBreakingSpace);
        // reset the content of this text node
        child.nodeValue = newContent;
      }
    }
  });
}

function isDomNode(node) {
  if (
      node.nodeType == 1 &&
      node.childNodes.length &&
      node.tagName !== "SCRIPT"
    ) {
    return true;
  } else {
    return false;
  }
}

function isTextNode(node) {
  return node.nodeType == 3 ? true : false;
}

function joinArray(content, charToSkip) {
  let newContent = "";
  content.forEach((word, index) => {
    if (
        word !== charToSkip &&
        content[index + 1] !== charToSkip &&
        content[index + 1] !== ""
      ) {
      newContent += word + " ";
    } else {
      newContent += word;
    }
  });
  return newContent;
}

function widowBuster(selectors) {
  let nodeList = [];
  selectors.forEach(selector => {
    nodeList.push(Array.from(document.querySelectorAll(selector)));
  });
  const nodesToWidowBust = findNodesToWidowBust(nodeList.flat(1));
  if (nodesToWidowBust.size) {
    fixWidows(nodesToWidowBust);
  }
}
