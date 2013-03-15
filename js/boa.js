(function($) {
	
	var BindingObj = function(binding, property) {
		this.binding = binding;
		this.property = property;
	}
	
	
	
	var utils = {
		getBindingTypes:function(template) {
			var attr = $(template).data("bind");
			if(!attr)
				return [];
			
			var types= [];
			var arr = attr.split(",");
			for(var i = 0, len = arr.length; i<len; i++) {
				var pair = arr[i].split(":");
				if(pair && pair.length === 2) {
					types[types.length] = new BindingObj( pair[0].replace(/\s/, ""), pair[1].replace(/\s/, "") );
				}
			};
			return types;
		},
		getValue : function(data, propertyString) {
			var arr = propertyString.split(".");
			for(var i =0, len = arr.length; i<len; i++) {
				data = data[arr[i]];
			}
			return data;
		},
		isArray : function(obj) {
			return typeof obj !== "undefined"
	            && typeof obj.slice == "function"
	            && Object.prototype.toString.call( obj ) === '[object Array]';
		}
	};
	
	var binders = {
		text : function(elm, obj, data) {
			var val = utils.getValue(data, obj.property);
			elm.text(val);
		},
		html : function(elm, obj, data) {
			var val = utils.getValue(data, obj.property);
			elm.html(val);
		},
		foreach: function(elm, obj, data) {
			var val = utils.getValue(data, obj.property);
			
			if(utils.isArray(val)) {
				var elmTemplate = elm.children().clone(true);
				elm.children().remove();
				for(var i =0, len = val.length; i<len; i++) {
					var newElm = elmTemplate.clone(true);
					elm.append(newElm);
					bindChildren(newElm, val[i]);
				}
			}
		}
	};
	
	
	var bindSingleElm = function(elm, data) {
		var bindings = utils.getBindingTypes(elm),
			obj = null,
			binder = null;

		for(var i = 0, len = bindings.length; i<len; i++) {
			obj = bindings[i];
			binder = binders[obj.binding];
			
			if(typeof binder == "function") {
				binder.apply(this, [elm, obj, data]);
			}
		}
		elm.removeAttr("data-bind");
	};
	var bindChildren = function(elm, data) {
		var result = bindSingleElm($(elm), data); 

		var children = $(elm).children();
		children.each(function(idx, elm) {
			bindChildren(elm, data);
		});
		
	};
	
	var exports = {
		bind: function(template, data) {
			var returnElm = $(template).clone(true);
			bindChildren(returnElm, data);
			return returnElm;
		},
		binders : binders,
		utils:utils
	};
	
	this.boa = exports;
})(jQuery);