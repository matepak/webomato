import {stopWatch} from  "../js/timer";
describe("Timer module", function(){
    it("should return \"59\"", () =>{
        let watch = stopWatch(10);

        watch.tick();

        expect(watch.getSeconds()).toEqual("59");
    });


});