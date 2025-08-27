// cfSlider�� �۵� ����� direction�� horizontal�� ��쿡 ���� ����帮��(���� �����̵�, direction�� vertical�̸� ���� �����̵�)
// �����۵��� ���ΰ� �ִ� container�� margin-left ���� �����ؼ�
// margin-left�� �۰��ϸ� �����۵��� �������� �����̰�, margin-left�� ũ���ϸ� �����۵��� ���������� �����̴� ������ ����մϴ�.
// margin-left ���� ������ �� jQuery�� animate �޼��带 ����ؼ� container�� �����̵��ϴ� ��ó�� ���̰� �մϴ�.
// �׸��� �� ����� ��� ���� ù ��° �������� ���� �ִµ� margin-left�� ũ���ϰų�, ������ �������� ���� �ִµ� margin-left�� �۰��ϸ�
// ������ �������� ���� �Ǵ� ������ �߻��ϹǷ�, html�ڵ忡 �ִ� ���� ������ ��� �� ���ʰ� ���ʿ� �ִ� �����۵��� �����Ͽ�
// ���� ������ ����� �հ� �ڿ� �ٿ��־ ���ο� ������ ����� ����� ����� ����մϴ�. �̶� �յڿ� �����ؼ� �ٿ��ִ� �������� �� ������
// ȭ�鿡 ������ �������� ���� ���� ���ݴϴ�.(options���� display �׸��Դϴ�.)

; (function ($, window, document, undefined) {


	// plugin �̸�, default option ����
	var pluginName = 'cfSlider',
		defaults = {
		    container: '.container',	// �����۵��� ������ �ִ� ������Ʈ�� jQuery ������
			item: '.item',				// ������ ������Ʈ�� jQuery ������
			display: 1,					// ȭ�鿡 �������� �������� ��
			move: 1,					// �� ���� �����̵��(�̵���) �������� ��
			direction: 'horizontal',	// ���ν����̵�: horizontal, ���ν����̵�: vertical
			speed: 400,					// �����̵� �ӵ�, �и������� ������ ���� �Ǵ� jQuery.animate()�� ��밡���� 'slow', 'fast' �� ���ڿ�
			prevBtn: '.prev',			// ���� ��ư�� jQuery ������(�� ��ư ������ �ʿ� ����)
			nextBtn: '.next',			// ���� ��ư�� jQuery ������(�� ��ư ������ �ʿ� ����)
			eventType: 'click',			// slider�� �۵���ų �� �ʿ��� �̺�Ʈ. ��, ����/���� ��ư�� �� �̺�Ʈ�� �߻��ϸ� slider �۵�
			prevEventType: null,		// prev, next�� �̵��� �� ����� Ư���� �̺�Ʈ Ÿ�� ���
			nextEventType: null,		// Ȱ�뿹) ������� ������ �� ��ġ swipe(�ø�ŷ)���� slider�� �۵���Ű�� ������ �� �ڸ��� ������
										// Ŀ���� �̺�Ʈ Ÿ���� ����ϰ�, ��ġ�� �� �� �� Ŀ���� �̺�Ʈ�� cfSlider�� �����ų ������Ʈ���� �߻���Ű�� ��
			callback: null				// �����̵� �ִϸ��̼��� ������ ����� �ݹ��Լ�, ���ڷ� ���� ȭ�鿡 ���̰� �ִ� �����۵��� DOM��ü�� �ް� ��
			// callback: function(items) {
				// console.log(items);	// �̷� ������ ����Ͻø� �˴ϴ�.
			// }
		};




	// plugin constructor
	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);


		this._defaults = defaults;
		this._name = pluginName;


		this.init();
	}




	// initialization logic
	Plugin.prototype.init = function() {

		var slider = $(this.element),
			options = this.options,
			$container = slider.find(options.container),
			$items = $container.find(options.item).not('.cfslider_clone'),
			itemLength = $items.length,
			$afterItems = $items.slice(0, options.display).clone(),		// �����۵� �߿��� �տ��� ���� options.display ��ŭ ����
			$beforeItems = $items.slice(itemLength - options.display, itemLength).clone(),	// �����۵� �߿��� �ڿ��� ���� options.display ��ŭ ����
			itemSize = options.direction === 'horizontal' ? $items.first().width() : $items.first().height(),		// ������ �ϳ��� �ʺ� �Ǵ� ���̸� ����
			marginType = options.direction === 'horizontal' ? 'marginLeft' : 'marginTop',	// �����̵� ȿ���� ����� margin�� ����
			$prevBtn = $(options.prevBtn),
			$nextBtn = $(options.nextBtn);


		this.container = $container;
		this.marginType = marginType;
		this.itemSize = itemSize;
		this.itemLength = itemLength;


		$beforeItems.each(function() {
			$(this).addClass('cfslider_clone');
		});


		$afterItems.each(function() {
			$(this).addClass('cfslider_clone');
		});


		slider.css('overflow', 'hidden');	// �ʼ� css �Ӽ�, css�ʿ��� ���Ǿ��ϴ� ��츦 ����� ����, ���� �����̴� $container�� �ΰ� �ִ� slider�� overflow:hidden �Ӽ��� ������ �־�� �ڽ��� ũ�⸸ŭ�� ����ڿ��� �����ټ� �ֱ� ����


		$container.empty();
		$container.append($beforeItems, $items, $afterItems);	// ���� �����۵��� �տ��� beforeItems�� �߰��ϰ� �ڿ��� afterItems�� �߰���
																// ��, ���� ������ ����� '1-��','2-��','3-��','4-��','5-��' �̰� move�� 3�̶�� �Ʒ��� ���̵�
																// ==> '1-��','2-��','3-��','4-��','5-��','6-��','7-��','8-��','9-��','10-��','11-��'
																// �¿� �̵��� ���ؼ� ���� html�ڵ忡 �ִ� ������ ����� �յڿ� ����(clone)�� �����۵��� �� �ٿ� �ִ� ��




		// �׸��� ���� $container�� width�� ���� �����س��� �����۵���� ������ width�� ������ְ�
		// ���� html�ڵ忡 �ִ� ù ��° �������� ���̰� �ϱ����� $container�� marginLeft ���� ������
		// ��) itemLength = 5, itemSize = 100, move = 3 �� ��Ȳ�̾��ٸ�
		// 		$container�� width�� �տ� 3��, ���� 5��, �ڿ� 3�� �̷��� 11���� �������̶� 1100�� �ǰ�
		//		���� 5�� �� ù ��°�� ���� ó���� ���̰� �ϱ����� �տ� 3�� width ��ŭ�� -marginLeft ó����
		// * �� ������ direction�� horizontal�� ��쿡 �ش��մϴ�. vertical�� ��쿡�� $container�� width�� itemSize�̰� marginLeft��� marginTop�� ����մϴ�.
		var containerCss = {};
		containerCss['width'] = options.direction === 'horizontal' ? itemSize * (itemLength + options.display * 2) : itemSize;
		containerCss[marginType] = -(itemSize * options.display);

		$container.css(containerCss);


		// ���� ��ư�� �̺�Ʈ �߻��� ����
		$prevBtn
			.unbind(options.eventType + '.cfSlider')
			.bind(options.eventType + '.cfSlider', function() {
				go('prev', $container, marginType, itemSize, itemLength, options);
			});


		// ���� ��ư�� �̺�Ʈ �߻��� ����
		$nextBtn
			.unbind(options.eventType + '.cfSlider')
			.bind(options.eventType + '.cfSlider', function() {
				go('next', $container, marginType, itemSize, itemLength, options);
			});


		// Ŀ���� �̺�Ʈ Ÿ���� ��ϵǾ��� ���
		if (options.prevEventType) {
			slider
				.unbind(options.prevEventType + '.cfSlider')
				.bind(options.prevEventType + '.cfSlider', function() {
					go('prev', $container, marginType, itemSize, itemLength, options);
				});
		}


		if (options.nextEventType) {
			slider
				.unbind(options.nextEventType + '.cfSlider')
				.bind(options.nextEventType + '.cfSlider', function() {
					go('next', $container, marginType, itemSize, itemLength, options);
				});
		}
	};

	// �����̵� �Լ�
	function go(direction, $container, marginType, itemSize, itemLength, options, currentMargin) {

		if ($container.is(':animated')) {		// �ִϸ��̼� �������� �� ������ ���� ������ ó��
			return;
		}

		var obj = {},	// animate�� �ѱ� parameter�� ����� ���� �ӽ� ��ü
			currentMargin = currentMargin === undefined ? parseInt($container.css(marginType)) : currentMargin;	// $container�� ���� margin

		if (direction === 'prev') {
			var targetMargin = currentMargin + itemSize * options.move;		// �̵��� margin
			obj[marginType] = targetMargin;

			// �����̵� ����
			$container.animate(obj, options.speed, function() {
				if ((Math.abs(currentMargin) / itemSize) <= (options.move > options.display ? options.move : options.display)) {	// ���� ��ġ�� �������� move�� �����ۺ��� ���� �������� ���
					targetMargin = targetMargin - (itemSize * itemLength);	// �̵��� margin �缳��
					$container.css(marginType, targetMargin);	// itemSize * itemLength ��ŭ margin�� ���� -> �̷��� �ϱ� ���� �����۵��� clone()�ؼ� ������ �յڿ� �ٿ����� �� -> ���������� margin�� �����ǰ� ���̴� ������ �׸��� ���� ������ ����ڴ� �������� ����
				}


				if (options.callback != null) {
					var list = $container.find(options.item);
					options.callback(list.slice(Math.abs(targetMargin) / itemSize, Math.abs(targetMargin) / itemSize + options.display));
				}
			});


			try {
				if (options.prevBtn == ".Go1Prev"){
					fncGo1Pre();
				}else if (options.prevBtn == ".Go3Prev"){
					fncGo3Pre();
				}
			} catch (e) {}

		} else if (direction === 'next') {
			var targetMargin = currentMargin - itemSize * options.move;		// �̵��� margin
			obj[marginType] = targetMargin;

			// �����̵� ����
			$container.animate(obj, options.speed, function() {
				if (itemLength + options.display * 2 - (Math.abs(currentMargin) / itemSize + options.display) <= (options.move > options.display ? options.move : options.display)) {	// ���� ��ġ�� �������� move�� �����ۺ��� ���� �������� ���
					targetMargin = targetMargin + (itemSize * itemLength);	// �̵��� margin �缳��
					$container.css(marginType, targetMargin);	// itemSize * itemLength ��ŭ margin�� ���� -> �̷��� �ϱ� ���� �����۵��� clone()�ؼ� ������ �յڿ� �ٿ����� �� -> ���������� margin�� �����ǰ� ���̴� ������ �׸��� ���� ������ ����ڴ� �������� ����
				}

				if (options.callback != null) {
					var list = $container.find(options.item);
					options.callback(list.slice(Math.abs(targetMargin) / itemSize, Math.abs(targetMargin) / itemSize + options.display));
				}
			});

			try {
				if (options.nextBtn == ".Go1Next"){
					fncGo1Next();
				}else if (options.nextBtn == ".Go3Next"){
					fncGo3Next();
				}
			} catch (e) {}
		}
	}


	// go �Լ��� cfSlider �ν��Ͻ��� �޼���� ����
	Plugin.prototype.go = go;

	// jQuery ��ü�� element�� data�� plugin�� ����
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if ( ! $.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	};
})(jQuery, window, document);
