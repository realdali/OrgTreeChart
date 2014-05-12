(function($){
	$.fn.otChart = function(options){
		//配置文件默认参数
		//option defaults
		var opts = $.extend({}, $.fn.otChart.defaults, options);
		var $container = $("<div/>").addClass("otChart");
		$(opts.chartElement).append($container);
		buildNode($container, opts.data);
	};

	$.fn.otChart.defaults = {
		
	}

	//添加节点
	function buildNode($container, tree){
		var $table = $("<table cellpadding='0' cellspacing='0' border='0'/>");
		var $tbody = $("<tbody/>");

		//构建节点
		var $nodeRow = $("<tr/>").addClass("node-cells");
		var $nodeCell = $("<td/>").addClass("node-cells").attr("colspan", 2);
		if(tree.children && tree.children.length > 1){
			$nodeCell.attr("colspan", tree.children.length * 2);
		}
		$nodeDiv = $("<div>").addClass("node").text(tree.name);
		$nodeDiv.css('cursor', 'pointer');

		//构建根节点
		$nodeCell.append($nodeDiv);
		$nodeRow.append($nodeCell);
		$tbody.append($nodeRow);
		
		//若存在子节点，则构建子树
		if(tree.children && tree.children.length > 0){
			//构建树框架图上半部分
			var $downLineRow = $("<tr/>");
			var $downLineCell = $("<td/>").attr("colspan", tree.children.length * 2);
			var $downLine = $("<div></div>").addClass("line down");
			$downLineCell.append($downLine);
			$downLineRow.append($downLineCell);
			$tbody.append($downLineRow);

			var $linesRow = $("<tr/>");
			//构建框架树下半部分
			for(var i = 0; i < tree.children.length; i ++){
				var $left = $("<td>&nbsp;</td>").addClass("line left top");
		        var $right = $("<td>&nbsp;</td>").addClass("line right top");
		        if(i == 0){
		        	$left.removeClass("top");
		        }else if(i == tree.children.length - 1){
		        	$right.removeClass("top");
		        }
		        $linesRow.append($left).append($right);
		    }
		    $tbody.append($linesRow);

		   	//构建子树
		   	var $childNodesRow = $("<tr/>");
		   	for(var i = 0; i < tree.children.length; i ++){
		   		var $td = $("<td class='node-container'/>");
	           	$td.attr("colspan", 2);
	           	//添加子节点的树结构
	           	buildNode($td, tree.children[i]);
	           	$childNodesRow.append($td);
		   	}
		   	$tbody.append($childNodesRow);
		}
		//完成树结构的整合
		$table.append($tbody);
		$container.append($table);
	}
})(jQuery); 