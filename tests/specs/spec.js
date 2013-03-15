describe("BOA", function() {
	
	describe("simple data bindings", function() {
		
		var div;

		beforeEach(function() {
		
		});
		afterEach(function() {
		
		});
		
		it("can call bind", function() {
			expect(boa).toBeDefined();
			expect(typeof boa.bind).toEqual("function");
		});
		
		it("will return null if no binding detected", function() {
			div = $("<div />");
			var result = boa.utils.getBindingTypes(div);
			expect(result).toEqual(null);
		});
		it("removes whitespace from binding types", function() {
			 div = $("<div />").data("bind", "text : message");
			 
			 var result = boa.utils.getBindingTypes(div);
			 
			 expect(result[0].binding).toEqual("text");
		});
		
		it("can recognize a 'text' binding", function() {
			 div = $("<div />").data("bind", "text: message");
			 
			 var result = boa.utils.getBindingTypes(div);
			 
			 expect(result[0].binding).toEqual("text");
		});
		
		it("can recognize a multiple bindings", function() {
			 div = $("<div />").data("bind", "text: message, somethingElse:something");
			 
			 var result = boa.utils.getBindingTypes(div);
			 
			 expect(result[0].binding).toEqual("text");
			 expect(result[1].binding).toEqual("somethingElse");
		});
		
		it("can parse binding property", function() {
			 div = $("<div />").data("bind", "text: message");
			 
			 var result = boa.utils.getBindingTypes(div);
			 
			 expect(result[0].property).toEqual("message");
		});
		
		it("can parse binding multiple binding properties", function() {
			 div = $("<div />").data("bind", "text: message, somethingElse:something");
			 
			 var result = boa.utils.getBindingTypes(div);
			 
			 expect(result[0].property).toEqual("message");
			 expect(result[1].property).toEqual("something");
		});
		it("renders an elm without binding attributes", function() {
			div = $("<div />").data("bind", "text: message, somethingElse:something");
			 
			 var result = boa.bind(div, {message: "hello world!"});
			 expect(result.data("bind")).not.toBeDefined();
		});
		it("can bind a simple 'text' binding", function() {
			div = $("<div />").data("bind", "text: message");
			 
			 var result = boa.bind(div, {message: "hello world!"});
			 expect(result.text()).toEqual("hello world!");
		});
		
		it("can bind a 'text' binding down an object tree", function() {
			div = $("<div />").data("bind", "text: child.child_two.message");
			 var data = {
				child : {
					child_two : {
						message: "im down here!"
					}
				}
			 };
			 var result = boa.bind(div, data);
			 expect(result.text()).toEqual("im down here!");
		});
		
		
		
	});
});