const Node = require('./Node')

describe('Node', () => {
    test('should create object with default null values', () => {
        const node = new Node()
        expect(node.info).toBe(null)
        expect(node.link).toBe(null)
    })
    test('should create object with supplied link and info values', () => {
        const val = 'val'
        const link = {}
        const node = new Node(val, link)
        expect(node.info).toEqual(val)
        expect(node.link).toEqual(link)
    })
    test('.info', () => {
        const node = new Node('val')
        expect(node.info).toEqual('val')
    })
    test('.link', () => {
        const node = new Node(null, {})
        expect(node.link).toEqual({})
    })
    test('.info=', () => {
        const node = new Node('val1')
        expect(node.info).toEqual('val1')
        node.info = 'val2'
        expect(node.info).toEqual('val2')
    })
    test('.link=', () => {
        const node = new Node(null, {})
        expect(node.link).toEqual({})
        node.link = { x: 1 }
        expect(node.link).toEqual({ x: 1 })
    })
})
