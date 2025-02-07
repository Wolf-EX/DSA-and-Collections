
import { WMath } from './WMath.js';
import { PriorityQueue } from './Collections/Queue/priorityqueue.js';
import { Comparator } from './Collections/comparator.js';
import { ArrayList } from './Collections/List/arraylist.js';
import { LinkedList } from './Collections/List/linkedlist.js';
import { HashMap } from './Collections/Map/hashmap.js';
import { Map } from './Collections/Map/map.js'; //can maybe remove later - here for testing
import { HashSet } from './Collections/Set/hashset.js';
import { Consumer } from './Collections/iterable.js';
import { BST } from './Collections/Tree/bst.js';
import { Sort } from './Algorithms/sort.js';
import { AVL } from './Collections/Tree/avl.js';
import { LinkedAVL } from './Collections/Tree/linkedavl.js';

document.addEventListener('DOMContentLoaded', () => {

  //Canvas
  const CANVAS = document.getElementById('mainCanvas');
  globalThis.mainCtx = CANVAS.getContext('2d');
  globalThis.defaultWidth = 1920;
  globalThis.defaultHeight = 1080;
  //globalThis.canvasWidth = screen.width;
  //globalThis.canvasHeight = screen.height;
  globalThis.canvasWidth = 1600;
  globalThis.canvasHeight = 900;
  globalThis.canvasWidthScale = defaultWidth / canvasWidth;
  globalThis.canvasHeightScale = defaultHeight / canvasHeight;
  CANVAS.setAttribute('width', canvasWidth);
  CANVAS.setAttribute('height', canvasHeight);

  //Utilitys
  globalThis.wMath = new WMath();


  class compareClassString extends Comparator{
  
    compare(a, b){
      try {
        return a.toString().localeCompare(b.toString());
      }
      catch(e){
        return null; //can this cause other errors?
      }
    }
  }

  // const tree = new BST();

  // tree.add("A");
  // tree.add("F");
  // tree.add("B");
  // tree.add("G");
  // tree.add("E");
  // tree.add("D");

  // console.log("bst: " + tree);
  // tree.array = tree.avlBalance();
  // console.log("bst: " + tree);

  const tree = new LinkedAVL();

  //left left
  tree.add("Q");
  tree.add("P");
  tree.add("D");
  tree.add("L");
  tree.add("C");
  tree.add("B");

  //right right
  // tree.add("A");
  // tree.add("B");
  // tree.add("D");
  // tree.add("E");
  // tree.add("C");
  // tree.add("F");

  //left right
  //tree.add("Q");
  //tree.add("E");
  //tree.add("K");
  //tree.add("C");
  //tree.add("F");
  //tree.add("G");


  //right left
  // tree.add("A");
  // tree.add("F");
  // tree.add("B");
  // tree.add("G");
  // tree.add("E");
  // tree.add("D");


  console.log(tree);

  console.log("inorder");
  console.log(tree.inOrderTraverse());
  console.log("preorder");
  console.log(tree.preOrderTraverse());
  console.log("postorder");
  console.log(tree.postOrderTraverse());

  console.log("avl: " + tree)
  //console.log(tree.array)

  /* const l1 = new ArrayList();

  l1.add(22);
  l1.add(21);
  l1.add(5);
  l1.add(16);
  l1.add(14);
  l1.add(81);
  l1.add(22);
  l1.add(99);
  l1.add(37);
  l1.add(65);

  const sort = new Sort();

  let l2 = l1.toArray();

  console.log("list 2 before sort: " + l2);
  l2 = sort.bubbleSort(l1.toArray());
  console.log("list 2 after bubble sort: " + l2);

  l2 = l1.toArray();
  console.log("list 2 before sort: " + l2);
  l2 = sort.selectionSort(l1.toArray());
  console.log("list 2 after selection sort: " + l2); */


  //let startTime = performance.now();
  //let endTime;
  //let o;
  //let loops = 10_000_000;
  //for(let i = 0; i < loops; i++){
  //  o = hash_map.get(64);
  //}
  //console.log(o)
  //endTime = performance.now();
  //console.log(`Start Time: ${startTime} - End Time: ${endTime}`);
  //console.log(`Time to run ${loops} Loops ${endTime - startTime}ms / ${(endTime - startTime) / 1000} seconds`);

  //let returned_value = hash_map.put(20, "All");

  //console.log("Returned value is: " + returned_value);

  //console.log("New map is: " + hash_map)

  //const hash_map2 = new HashMap(hash_map);

  // console.log("Initial Mappings for hash_map2 are: " + hash_map2);

  // hash_map2.put(55, "Test");
  // hash_map2.put("Hola", "Hello");
  // hash_map2.put("Globe", "World");

  // console.log("New map is: " + hash_map2);

  //console.log(Map.prototype.isPrototypeOf(h1))
  //console.log(h1 instanceof Map)
  
  /* const l1 = new LinkedList();

  l1.add(12);
  l1.add(8);
  l1.add(2);
  l1.add(20);
  l1.add(22);
  console.log("Linked List" + l1);


  const queue = new PriorityQueue(l1);

  console.log("Initial PriorityQueue: " + queue);

  queue.add(10); 
  queue.add(15); 
  queue.add(30); 
  queue.add(8); 
  queue.add(5);

  console.log("PriorityQueue: " + queue);

  console.log("The element at the head of the queue is: " + queue.poll());

  console.log("The element at the head of the queue is: " + queue.poll());
  console.log("PriorityQueue: " + queue);
  console.log("The element at the head of the queue is: " + queue.poll());
  console.log("PriorityQueue: " + queue);
  console.log("The element at the head of the queue is: " + queue.poll());
  console.log("PriorityQueue: " + queue);
  console.log("The element at the head of the queue is: " + queue.poll());
  console.log("PriorityQueue: " + queue);


  console.log("Final PriorityQueue: " + queue); */

  //console.log("" + l1);

  //const it = l1.iterator();
  //console.log(it)

  //while (it.hasNext()) {

  //  let i = it.next();
    //console.log("" + i)
   // if(i < 10){
    //  it.remove();
   // }
    // next() is used to retrieve
    // elements in the list
//}

 // console.log("" + l1);
})