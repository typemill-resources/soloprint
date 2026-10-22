(function() {
	var tocToggle = document.getElementById('toc-toggle');
	var tocBackdrop = document.getElementById('toc-backdrop');
	var tocClose = document.getElementById('toc-close');
	var tocPanel = document.getElementById('toc-panel');
	var themeToggle = document.getElementById('theme-toggle');

	function closeToc() {
		document.body.classList.remove('toc-open');
		if (tocToggle) {
			tocToggle.setAttribute('aria-expanded', 'false');
			tocToggle.focus();
		}
	}

	function openToc() {
		document.body.classList.add('toc-open');
		if (tocToggle) {
			tocToggle.setAttribute('aria-expanded', 'true');
		}
		if (tocClose) {
			tocClose.focus();
		}
	}

	function toggleToc() {
		if (document.body.classList.contains('toc-open')) {
			closeToc();
		} else {
			openToc();
		}
	}

	if (tocToggle) {
		tocToggle.addEventListener('click', toggleToc);
	}

	if (tocBackdrop) {
		tocBackdrop.addEventListener('click', closeToc);
	}

	if (tocClose) {
		tocClose.addEventListener('click', closeToc);
	}

	if (tocPanel) {
		tocPanel.addEventListener('click', function(e) {
			var toggle = e.target.closest('.toc-folder-toggle');
			if (!toggle) {
				return;
			}
			var item = toggle.closest('.toc-item');
			if (!item) {
				return;
			}
			var isOpen = item.classList.toggle('open');
			toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		});
	}

	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape' && document.body.classList.contains('toc-open')) {
			closeToc();
		}
	});

	if (themeToggle) {
		themeToggle.setAttribute('aria-pressed',
			document.documentElement.getAttribute('data-theme') === 'dark' ? 'true' : 'false'
		);

		themeToggle.addEventListener('click', function() {
			var html = document.documentElement;
			var current = html.getAttribute('data-theme') || 'light';
			var next = current === 'dark' ? 'light' : 'dark';
			html.setAttribute('data-theme', next);
			themeToggle.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
			try {
				localStorage.setItem('soloprint-theme', next);
			} catch (e) {}
		});
	}
})();
