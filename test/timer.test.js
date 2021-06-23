import {Timer} from "./../js/timer";
describe("Timer module", function(){
    it("should return \"59\"", () =>{
        let stopWatch = new Timer(1);

        stopWatch.tick();

        expect(stopWatch.getSeconds()).toEqual("59");
    });


});