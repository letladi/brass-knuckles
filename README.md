Advanced Data Structures for JavaScript
=======================================
<p align="center">
  <a href="https://circleci.com/gh/Letladi/brass-knuckles">
    <img src="https://circleci.com/gh/Letladi/brass-knuckles.svg?style=svg" alt="Build Status">
  </a>
</p>

##### This project is under active development ⚡️

-------------------------------------------

brass-knuckles provides many efficient and well-tested [data structures][]:

From the basics:
- `Stack`
- `Queue`
- `LinkedList`
- `OrderedLinkedList`
- `DoublyLinkedList`



[Search trees][] (The trees follow the 'leaf tree' model; all data is stored in the leaf nodes of the tree):
- `LeafTree` (which defines the base class on which most of the trees are based)
- `MultiLeafTree` (which is a subclass of `LeafTree` that defines the base class for trees
that allow duplicate value insertions for a single key)


[Balanced search trees][] (with `O(logN)` performance on insertion, search and deletion):
- `WeightBalancedLeafTree`
- `HeightBalancedLeafTree`
- `abTree` (a type of [BTree][])
- `rbTree` (a [red black tree][])


Balanced search trees that allow duplicate value insertion:
- `WeightBalancedMultiLeafTree`
- `HeightBalancedMultiLeafTree`


[BTree]: https://en.wikipedia.org/wiki/B-tree
[Balanced search trees]: https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree
[red black tree]: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree
[data structures]: https://www.amazon.com/Advanced-Data-Structures-Peter-Brass/dp/0521880378/ref=sr_1_2?ie=UTF8&qid=1541833203&sr=8-2&keywords=advanced+data+structures
[Search trees]: https://en.wikipedia.org/wiki/Search_tree

License
-------

brass-knucles is [MIT-licensed](https://opensource.org/licenses/MIT).
