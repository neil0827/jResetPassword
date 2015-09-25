;(function($){
	var Plugin = function(ele,opt){
		this.$element = ele;
		this.defaults = {
			user:{
				id:"AAA",
				name:"张三"
			},
			submitUrl:"",
			close:function(){
				
			},
			cancel:function(){
				
			},
			ok:function(loginName,clientName,password,passwordConfirm){
				$.post(this.submitUrl,{"loginName":loginName,"password":password},null,"json").done(function(data){
					if(data.code==1)
						window.alert("success");
					else
						window.alert("fail");
				});
			}
		};
		this.options = $.extend({},this.defaults,opt);
	};
	Plugin.prototype = {
		init:function(){
			var that = this;
			
			var $context = $("<div id='context'></div>");
			$context.append("<div class='jResetPassword-background'></div>");
			
			var $header = $("<div class='jResetPassword-header'></div>");
			var $closeBtn = $("<button class='closeBtn' title='关闭'>×</button>").on("click",function(){
				$("#context").remove();
				that.options.close();
			});
			$header.append($closeBtn);
			$header.append("<div class='title'><span>修改用户密码</span></div>");
			
			var $body = $("<div class='jResetPassword-body'></div>");
			var $block = $("<div style='padding-left:15px;'></div>");
			$block.append("<table width='100%' border='0' cellpadding='0' class='noeditinfo'><tbody><tr><td><label> 用户名：</label> <span id='loginName'>"+this.options.user.id+"</span></td><td><label> 客户姓名：</label> <span id='clientName'>"+this.options.user.name+"</span></td></tr></tbody></table>");
			$block.append("<table width='100%' border='0' cellpadding='0' cellspacing='0' class='noeditinfo'><tbody><tr><td><label> 密码：</label></td><td><input id='password' type='password' maxlength='20'></td><td><i id='password_i' class='' style='width:16px;height:16px;display:inline-block;'></i><span>6-20位的数字或者字母.</span></td></tr><tr><td><label> 确定密码：</label></td><td><input id='passwordConfirm' type='password' maxlength='20'></td><td><i id='passwordConfirm_i' class='' style='width:16px;height:16px;display:inline-block;'></i><span id='passwordConfirm@span'>6-20位的数字或者字母.</span></td></tr></tbody></table>");
			$body.append($block);
			
			var $foot = $("<div class='jResetPassword-foot'></div>");
			$cancelBtn = $("<button class='btn cancel'>取消</button>").on("click",function(){
				$("#context").remove();
				that.options.cancel();
			});
			$okBtn = $("<button class='btn ok'>确定</button>").on("click",function(){
				var loginName = $("#loginName").html();
				var clientName = $("#clientName").html();
				var password = $("#password").val();
				var passwordConfirm = $("#passwordConfirm").val();
				
				$("#context").remove();
				
				that.options.ok(loginName,clientName,password,passwordConfirm);
			});
			$foot.append($cancelBtn);
			$foot.append($okBtn);
			
			var $main = $("<div class='jResetPassword-main'></div>");
			$main.append($header);
			$main.append($body);
			$main.append($foot);
			
			var $content = $("<div class='jResetPassword-content'></div>");
			$content.append($main);
			$context.append($content);
			$("body").append($context);
		}
	};
	
	$.extend($,{
		jResetPassword:function(options){
			var plugin = new Plugin(this,options);
			return plugin.init();
		}
	});
})(jQuery);