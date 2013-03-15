(function($) {
	
	var BindingObj = function(binding, property) {
		this.binding = binding;
		this.property = property;
	}
	
	
	
	var utils = {
		getBindingTypes:function(template) {
			var attr = $(template).data("bind");
			if(!attr)
				return null;
			
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
		}
	};
	
	var binders = {
		text : function(elm, obj, data) {
			var val = utils.getValue(data, obj.property);
			elm.text(val);
		}
	};
	
	
	var exports = {
		bind: function(template, data) {
			var bindings = utils.getBindingTypes(template),
				returnElm = $(template).clone().removeAttr("data-bind"),
			    obj = null,
				binder = null;
				
			for(var i = 0, len = bindings.length; i<len; i++) {
				obj = bindings[i];
				binder = binders[obj.binding];
				
				if(typeof binder == "function") {
					binder.apply(this, [returnElm, obj, data]);
				}
			}
			return returnElm;
		},
		binders : binders,
		utils:utils
		
	};
	
	this.boa = exports;
})(jQuery);