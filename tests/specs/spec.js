describe("BOA", function() {
	var div;
	
	describe("utility functions", function() {
		it("will return empty array if no binding detected", function() {
			div = $("<div />");
			var result = boa.utils.getBindingTypes(div);
			expect(result).toEqual([]);
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
		it("can determine if an object is an array", function() {
			expect(boa.utils.isArray([1,2])).toBeTruthy();
			expect(boa.utils.isArray({})).toBeFalsy();
			expect(boa.utils.isArray({
				slice:function(){}
			})).toBeFalsy();
		});
	});
	
	describe("simple data bindings", function() {
		
		it("can call bind", function() {
			expect(boa).toBeDefined();
			expect(typeof boa.bind).toEqual("function");
		});
		
		it("renders an elm without binding attributes", function() {
			div = $("<div />").data("bind", "text: message, somethingElse:something");
			 
			 var result = boa.bind(div, {message: "hello world!"});
			 expect(result.attr("data-bind")).not.toBeDefined();
		});
		it("can bind a simple 'text' binding", function() {
			div = $("<div />").attr("data-bind", "text: message");
			 
			 var result = boa.bind(div, {message: "hello world!"});
			 expect(result.text()).toEqual("hello world!");
		});
		it("can bind a simple 'html' binding", function() {
			div = $("<div />").attr("data-bind", "html: message");
			 
			 var result = boa.bind(div, {message: "<h1>hello world!</h1>"});
			 expect(result.find("h1").length).toEqual(1);
			 expect(result.find("h1").text()).toEqual("hello world!");
		});
		
		it("can bind a 'text' binding down an object tree", function() {
			div = $("<div />").attr("data-bind", "text: child.child_two.message");
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
	describe("loops / multi level templates", function() {
		
		it("can bind to a multi level template", function() {
			div = $("<div />");
			var holder = $("<div />").appendTo(div);
			var holder2 = $("<div />").appendTo(holder);
			
			var child1 = $("<div />").attr("data-bind", "text: message").addClass("bind1").appendTo(div);
			var child2 = $("<div />").attr("data-bind", "text: message2").addClass("bind2").appendTo(holder);
			var child3 = $("<div />").attr("data-bind", "text: message3").addClass("bind3").appendTo(holder2);
			
			 var result = boa.bind(div, {message:"one", message2:"two", message3:"three"});

			 expect(result.find("div.bind1").text()).toEqual("one");
			 expect(result.find("div.bind2").text()).toEqual("two");
			 expect(result.find("div.bind3").text()).toEqual("three");
			 
		});
		
		it("can parse a foreach binding", function() {
			div = $("<ul />").attr("data-bind", "foreach: objs");
			$("<li />").attr("data-bind", "text: message").appendTo(div);
			var data = {
				objs : [
					{message: "im an object in an array, my index is 0"},
					{message: "im another object in an array, my index is 1"},
					{message: "im yet another object in an array, my index is 2"}
				]
			};
			
			var result = boa.bind(div, data);
			expect(result.find("li").length).toEqual(3);
			expect(result.find("li:eq(0)").text()).toEqual("im an object in an array, my index is 0");
			expect(result.find("li:eq(1)").text()).toEqual("im another object in an array, my index is 1");
			expect(result.find("li:eq(2)").text()).toEqual("im yet another object in an array, my index is 2");
		});
		
	});
});


















