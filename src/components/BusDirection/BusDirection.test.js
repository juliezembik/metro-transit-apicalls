const rewire = require("rewire")
const BusDirection = rewire("./BusDirection")
const mapStoreToProps = BusDirection.__get__("mapStoreToProps")
// @ponicode
describe("mapStoreToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapStoreToProps({ displayDirection: "Southwest", saveAllInputs: [false, false, true] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapStoreToProps({ displayDirection: "Southeast", saveAllInputs: [false, false, true] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapStoreToProps({ displayDirection: "Southwest", saveAllInputs: [true, true, true] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            mapStoreToProps({ displayDirection: "Southeast", saveAllInputs: [false, false, false] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            mapStoreToProps({ displayDirection: "South", saveAllInputs: [true, true, false] })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapStoreToProps(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
