const { Node } = require('./DoublyLinkedList')

describe('DoublyLinkedList Node', () => {
    test('should create obj with default values', () => {
        const node = new Node()
        expect(node.info).toEqual(null)
        expect(node.back).toEqual(null)
        expect(node.next).toEqual(null)
    })
    test('.info', () => {
        const node = new Node('info')
        expect(node.info).toEqual('info')
    })
    test('.info=', () => {
        const node = new Node('info')
        expect(node.info).toEqual('info')
        node.info = 'information'
        expect(node.info).toEqual('information')
    })
    test('.back', () => {
        const node1 = new Node()
        const node2 = new Node('info', node1)
        expect(node2.back).toEqual(node1)
    })
    test('.back=', () => {
        const node1 = new Node()
        const node2 = new Node()
        node1.back = node2
        node2.back = node1
        expect(node1.back).toEqual(node2)
        expect(node2.back).toEqual(node1)
    })
    test('.next', () => {
        const node1 = new Node()
        const node2 = new Node('info', null, node1)
        expect(node2.next).toEqual(node1)
    })
    test('.next=', () => {
        const node1 = new Node()
        const node2 = new Node()
        node1.next = node2
        node2.next = node1
        expect(node1.next).toEqual(node2)
        expect(node2.next).toEqual(node1)
    })
})
